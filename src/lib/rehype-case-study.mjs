// Shapes case study Markdown into an editorial layout:
// 1. A paragraph that holds only an image becomes a <figure>, with the
//    Markdown image title ("![alt](src "caption")") as its caption.
// 2. Each h2 and everything up to the next h2 is wrapped in a <section>,
//    so the page can put the heading in a side column and the story beside it.
// 3. See stickyHeads below.
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
}

// 3. The sticky heading must stop before the first full-width block (figure,
//    stats, pair, quote), or it slides over it. A sticky element can't leave
//    its parent, so wrap the h2 in a div that only spans the rows before that
//    block.
const FULL = ['cs-figure', 'stats', 'pair', 'live-demo'];
const isFull = (n) =>
  n.type === 'element' &&
  (n.tagName === 'blockquote' || (n.properties?.className || []).some((c) => FULL.includes(c)));

function stickyHeads(tree) {
  for (const sec of tree.children) {
    if (sec.type !== 'element' || !(sec.properties?.className || []).includes('cs-section')) continue;
    const [h2, ...rest] = sec.children;
    const items = rest.filter((n) => n.type === 'element');
    const firstFull = items.findIndex(isFull);
    const rows = Math.max(1, firstFull === -1 ? items.length : firstFull);
    sec.children = [
      { type: 'element', tagName: 'div', properties: { className: ['cs-head'], style: `--head-rows: ${rows}` }, children: [h2] },
      ...rest,
    ];
  }
}

export default function rehypeCaseStudy() {
  return (tree, file) => {
    const path = (file?.path || file?.history?.[0] || '').replace(/\\/g, '/');
    if (!path.includes('content/projects')) return;
    figures(tree);
    sections(tree);
    stickyHeads(tree);
  };
}
