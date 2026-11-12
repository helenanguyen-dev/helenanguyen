// Live demo of the Azure Docs Assistant (case study page).
// Nothing is sent anywhere until a visitor clicks "Start the assistant".
// The backend (Helena's azure_rag/live-demo service) keeps the API key and
// the rate limits; this file only draws the chat and calls it.

type Msg = { role: 'user' | 'assistant'; content: string };
type Reply = { answer: string; sources: { title: string; url: string }[]; steps: { tool: string; query: string }[] };

const STARTERS = [
  'How do I restrict access to an App Service app by IP address?',
  'What is the difference between the hot, cool and archive tiers in Blob Storage?',
  'When should I use a custom role instead of a built-in role?',
];
const MAX_CHARS = 300;

function el<K extends keyof HTMLElementTagNameMap>(tag: K, cls?: string, text?: string) {
  const node = document.createElement(tag);
  if (cls) node.className = cls;
  if (text) node.textContent = text;
  return node;
}

// A tiny, safe Markdown renderer: paragraphs, lists, **bold**, *italic*, `code` and
// https links. Everything else stays plain text (no HTML from the model).
function inline(text: string, into: HTMLElement) {
  const re = /\*\*([^*]+)\*\*|`([^`]+)`|\[([^\]]+)\]\((https:\/\/[^\s)]+)\)|\*([^*\s][^*]*)\*/g;
  let last = 0;
  for (const m of text.matchAll(re)) {
    into.append(text.slice(last, m.index));
    if (m[1]) into.append(el('strong', undefined, m[1]));
    else if (m[2]) into.append(el('code', undefined, m[2]));
    else if (m[5]) into.append(el('em', undefined, m[5]));
    else {
      const a = el('a', undefined, m[3]);
      a.href = m[4];
      a.target = '_blank';
      a.rel = 'noopener noreferrer';
      into.append(a);
    }
    last = (m.index ?? 0) + m[0].length;
  }
  into.append(text.slice(last));
}

function markdown(src: string): DocumentFragment {
  const frag = document.createDocumentFragment();
  let list: HTMLElement | null = null;
  for (const raw of src.split('\n')) {
    const line = raw.trim();
    const bullet = line.match(/^(?:[-*]|\d+[.)])\s+(.*)$/);
    if (bullet) {
      if (!list) frag.append((list = el(/^\d/.test(line) ? 'ol' : 'ul')));
      const li = el('li');
      inline(bullet[1], li);
      list.append(li);
    } else if (line) {
      list = null;
      const p = el('p');
      inline(line.replace(/^#+\s*/, ''), p);
      frag.append(p);
    } else list = null;
  }
  return frag;
}

function mount(box: HTMLElement) {
  const api = (box.dataset.api ?? '').replace(/\/$/, '');
  const history: Msg[] = [];

  const chat = el('div', 'ld-chat');
  const head = el('div', 'ld-head');
  head.append(el('span', 'ld-dot'), el('span', 'ld-name', 'Azure Docs Assistant'), el('span', 'ld-via', 'via Microsoft Learn MCP'));
  const log = el('div', 'ld-log');
  log.setAttribute('aria-live', 'polite');
  const welcome = el('div', 'ld-msg ld-bot');
  welcome.append(markdown("Hi! Ask me about Azure. I search Microsoft Learn first, then answer with links to the pages I used."));
  const starters = el('div', 'ld-starters');
  const form = el('form', 'ld-form');
  const input = el('input', 'ld-input');
  input.type = 'text';
  input.maxLength = MAX_CHARS;
  input.placeholder = 'Ask an Azure question';
  input.setAttribute('aria-label', 'Your question');
  const send = el('button', 'ld-send', 'Ask');
  send.type = 'submit';
  form.append(input, send);
  log.append(welcome, starters);
  chat.append(head, log, form);

  for (const q of STARTERS) {
    const b = el('button', 'ld-chip', q);
    b.type = 'button';
    b.addEventListener('click', () => ask(q));
    starters.append(b);
  }

  const scroll = () => (log.scrollTop = log.scrollHeight);

  async function ask(question: string) {
    question = question.trim().slice(0, MAX_CHARS);
    if (!question || send.disabled) return;
    starters.remove();
    log.append(el('div', 'ld-msg ld-user', question));
    const pending = el('div', 'ld-msg ld-bot ld-pending', 'Searching Microsoft Learn…');
    log.append(pending);
    scroll();
    input.value = '';
    input.disabled = send.disabled = true;

    try {
      const res = await fetch(`${api}/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: [...history, { role: 'user', content: question }] }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(typeof data.detail === 'string' ? data.detail : 'Something went wrong. Please try again.');
      const reply = data as Reply;
      pending.replaceChildren();
      pending.classList.remove('ld-pending');
      for (const s of reply.steps) {
        const step = el('p', 'ld-step');
        step.textContent = `Searched Microsoft Learn for “${s.query}”`;
        pending.append(step);
      }
      pending.append(markdown(reply.answer));
      if (reply.sources.length) {
        const src = el('div', 'ld-sources');
        src.append(el('span', 'ld-sources-label', 'Sources'));
        for (const s of reply.sources) {
          const a = el('a', undefined, s.title);
          a.href = s.url;
          a.target = '_blank';
          a.rel = 'noopener noreferrer';
          src.append(a);
        }
        pending.append(src);
      }
      history.push({ role: 'user', content: question }, { role: 'assistant', content: reply.answer.slice(0, 3000) });
      history.splice(0, Math.max(0, history.length - 6));
    } catch (e) {
      pending.classList.remove('ld-pending');
      pending.classList.add('ld-error');
      pending.textContent = e instanceof Error && e.message !== 'Failed to fetch' ? e.message : "The assistant isn't reachable right now. Please try again in a minute.";
    } finally {
      input.disabled = send.disabled = false;
      input.focus();
      scroll();
    }
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    ask(input.value);
  });
  return { chat, input };
}

document.querySelectorAll<HTMLElement>('.live-demo').forEach((box) => {
  const button = box.querySelector<HTMLButtonElement>('.live-demo-button');
  button?.addEventListener('click', async () => {
    button.disabled = true;
    button.textContent = 'Waking up the assistant…';
    // The free host sleeps when nobody has used it for a while; this wakes it.
    try {
      await fetch(`${(box.dataset.api ?? '').replace(/\/$/, '')}/health`, { signal: AbortSignal.timeout(90_000) });
    } catch {
      /* show the chat anyway; the first question reports any problem */
    }
    const { chat, input } = mount(box);
    box.replaceChildren(chat);
    input.focus({ preventScroll: true });
  });
});
