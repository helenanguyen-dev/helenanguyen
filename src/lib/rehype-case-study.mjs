// Shapes case study Markdown into an editorial layout:
// 1. A paragraph that holds only an image becomes a <figure>, with the
//    Markdown image title ("![alt](src "caption")") as its caption.
// 2. Each h2 and everything up to the next h2 is wrapped in a <section>,
//    so the page can put the heading in a side column and the story beside it.
// Only runs on files under src/content/projects.

const isWs = (n) => n.type === 'text' && !n.value.trim();

function figures(node) {
  if (!node.children) return;
  node.children = node.children.map((child) => {
    if (child.type === 'element' && child.tagName === 'p') {
      const kids = child.children.filter((k) => !isWs(k));
      if (kids.length === 1 && kids[0].type === 'element' && kids[0].tagName === 'img') {
        const img = kids[0];
        const caption = img.properties?.title;
        if (caption) delete img.properties.title;
        const fig = { type: 'element', tagName: 'figure', properties: { className: ['cs-figure'] }, children: [img] };
        if (caption) fig.children.push({ type: 'element', tagName: 'figcaption', properties: {}, children: [{ type: 'text', value: String(caption) }] });
        return fig;
      }
    }
    figures(child);
    return child;
  });
}

function sections(tree) {
  const out = [];
  let current = null;
  for (const node of tree.children) {
    if (node.type === 'element' && node.tagName === 'h2') {
      current = { type: 'element', tagName: 'section', properties: { className: ['cs-section'] }, children: [node] };
      out.push(current);
    } else if (current) {
      current.children.push(node);
    } else {
      out.push(node);
    }
  }
  tree.children = out;
  // The heading sticks beside the text only until the first wide block
  // (figure, number panel, image pair or pull quote), so it never slides over it.
  // To do that, the heading and the text before that block share a wrapper,
  // and a sticky element can't leave its wrapper.
  for (const sec of out) {
    if (sec.tagName !== 'section') continue;
    const [heading, ...rest] = sec.children;
    let cut = rest.findIndex(isWide);
    if (cut === -1) cut = rest.length;
    const lead = { type: 'element', tagName: 'div', properties: { className: ['cs-lead'] }, children: [heading, ...rest.slice(0, cut)] };
    sec.children = [lead, ...rest.slice(cut)];
  }
}

function isWide(n) {
  if (n.type !== 'element' && n.type !== 'raw') return false;
  if (n.type === 'raw') return /class="(stats|pair)"/.test(n.value) || /^\s*<blockquote/.test(n.value);
  const cls = [].concat(n.properties?.className || []);
  return n.tagName === 'figure' || n.tagName === 'blockquote' || cls.includes('stats') || cls.includes('pair');
}

export default function rehypeCaseStudy() {
  return (tree, file) => {
    const path = (file?.path || file?.history?.[0] || '').replace(/\\/g, '/');
    if (!path.includes('content/projects')) return;
    figures(tree);
    sections(tree);
  };
}
