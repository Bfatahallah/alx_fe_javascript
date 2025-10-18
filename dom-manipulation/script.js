const quotes = [
  { text: "The best way to get started is to quit talking and begin doing.", category: "Motivation" },
  { text: "Success is not in what you have, but who you are.", category: "Success" },
  { text: "To handle yourself, use your head; to handle others, use your heart.", category: "Wisdom" },
];

function showRandomQuote() {
  if (quotes.length === 0) {
    document.getElementById('quoteDisplay').textContent = 'No quotes available.';
    return;
  }
  const i = Math.floor(Math.random() * quotes.length);
  const quote = quotes[i];
  document.getElementById('quoteDisplay').textContent = `"${quote.text}" [${quote.category}]`;
}

document.getElementById('newQuote').addEventListener('click', showRandomQuote);

function addQuote() {
  const text = document.getElementById('newQuoteText');// In-memory quotes data
  const quotes = [
    { text: "The best way to get started is to quit talking and begin doing.", category: "Motivation" },
    { text: "Success is not in what you have, but who you are.", category: "Success" },
    { text: "To handle yourself, use your head; to handle others, use your heart.", category: "Wisdom" },
  ];


  (function () {
    const QUOTE_PREFIX = 'quote_';

    function byId(id) {
      return document.getElementById(id);
    }

    function uniqueKey() {
      // Timestamp + random to avoid collisions in the same millisecond
      return `${QUOTE_PREFIX}${Date.now()}_${Math.floor(Math.random() * 1e6)}`;
    }

    function loadQuotes() {
      const list = byId('quote-list');
      if (!list) return;

      // Clear the container
      list.innerHTML = '';

      // Collect and sort keys by timestamp if present
      const keys = Object.keys(localStorage)
        .filter((k) => k.startsWith(QUOTE_PREFIX))
        .sort();

      keys.forEach((key) => {
        let data;
        try {
          data = JSON.parse(localStorage.getItem(key) || '{}');
        } catch {
          data = null;
        }
        if (!data || !data.text || !data.author) return;

        // Item container
        const item = document.createElement('div');

        // Quote text + author
        const textEl = document.createElement('div');
        textEl.textContent = `"${data.text}" — ${data.author}`;

        // Remove button
        const removeBtn = document.createElement('button');
        removeBtn.textContent = 'Remove';
        removeBtn.className = 'remove-btn';
        removeBtn.setAttribute('data-key', key);

        item.appendChild(textEl);
        item.appendChild(removeBtn);
        list.appendChild(item);
      });
    }

    function addQuote() {
      const quoteInput = byId('quote-text');
      const authorInput = byId('quote-author');
      if (!quoteInput || !authorInput) return;

      const text = quoteInput.value.trim();
      const author = authorInput.value.trim();

      if (!text || !author) {
        alert('Both fields are required!');
        return;
      }

      const key = uniqueKey();
      const quoteObj = { text, author };
      localStorage.setItem(key, JSON.stringify(quoteObj));

      quoteInput.value = '';
      authorInput.value = '';
      loadQuotes();
    }

    function handleListClick(e) {
      const target = e.target;
      if (!(target instanceof HTMLElement)) return;

      if (target.classList.contains('remove-btn')) {
        const key = target.getAttribute('data-key');
        if (key) {
          localStorage.removeItem(key);
          loadQuotes();
        }
      }
    }

    function init() {
      const addBtn = byId('add-quote-btn');
      const list = byId('quote-list');

      if (addBtn) addBtn.addEventListener('click', addQuote);
      if (list) list.addEventListener('click', handleListClick);

      // Optional: allow Enter key to submit from either input
      ['quote-text', 'quote-author'].forEach((id) => {
        const input = byId(id);
        if (input) {
          input.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') addQuote();
          });
        }
      });

      loadQuotes();
    }

    document.addEventListener('DOMContentLoaded', init);
  })();
  /**
   * Render a random quote into #quoteDisplay (creates UI if needed).
   */
  function showRandomQuote() {
    // Ensure UI exists before rendering
    let display = document.getElementById('quoteDisplay');
    if (!display) {
      createAddQuoteForm();
      display = document.getElementById('quoteDisplay');
    }

    if (quotes.length === 0) {
      display.textContent = 'No quotes available.';
      return;
    }

    const i = Math.floor(Math.random() * quotes.length);
    const quote = quotes[i];
    display.textContent = `"${quote.text}" [${quote.category}]`;
  }

  /**
   * Add a new quote from input fields and show it.
   * Reads #newQuoteText and #newQuoteCategory, validates, updates data and UI.
   */
  function addQuote() {
    const textEl = document.getElementById('newQuoteText');
    const categoryEl = document.getElementById('newQuoteCategory');
    const msgEl = document.getElementById('quoteMessage');

    const text = textEl?.value.trim() ?? '';
    const category = categoryEl?.value.trim() ?? '';

    if (!text || !category) {
      if (msgEl) msgEl.textContent = 'Please enter both a quote and a category.';
      return;
    }

    if (msgEl) msgEl.textContent = '';
    quotes.push({ text, category });

    // Clear inputs and show a random (now including the newly added) quote
    textEl.value = '';
    categoryEl.value = '';
    showRandomQuote();
  }

  /**
   * Programmatically creates the UI for the quotes app:
   * - A display area for the current quote
   * - A "New Quote" button
   * - A form with inputs to add a new quote and category
   * Wires up event listeners for interactions.
   * @param {Object} [options]
   * @param {HTMLElement|string} [options.mount] Optional mount point (element or selector). Defaults to document.body.
   */
  function createAddQuoteForm(options = {}) {
    const { mount } = options;
    let root = null;

    if (mount instanceof HTMLElement) {
      root = mount;
    } else if (typeof mount === 'string') {
      root = document.querySelector(mount);
    }
    if (!root) root = document.body;

    // Avoid duplicating the app if it already exists
    if (document.getElementById('quoteApp')) return;

    const app = document.createElement('div');
    app.id = 'quoteApp';
    app.style.maxWidth = '720px';
    app.style.margin = '1rem auto';
    app.style.display = 'grid';
    app.style.gap = '0.75rem';

    // Quote display
    const display = document.createElement('div');
    display.id = 'quoteDisplay';
    display.style.padding = '0.75rem 1rem';
    display.style.border = '1px solid #ddd';
    display.style.borderRadius = '6px';
    display.setAttribute('role', 'status');

    // Controls: random quote
    const controls = document.createElement('div');
    controls.style.display = 'flex';
    controls.style.gap = '0.5rem';

    const newBtn = document.createElement('button');
    newBtn.id = 'newQuote';
    newBtn.type = 'button';
    newBtn.textContent = 'New Quote';

    controls.appendChild(newBtn);

    // Form to add quotes
    const formRow = document.createElement('div');
    formRow.style.display = 'grid';
    formRow.style.gridTemplateColumns = '1fr 1fr auto';
    formRow.style.gap = '0.5rem';

    const textInput = document.createElement('input');
    textInput.id = 'newQuoteText';
    textInput.type = 'text';
    textInput.placeholder = 'Enter a new quote';

    const categoryInput = document.createElement('input');
    categoryInput.id = 'newQuoteCategory';
    categoryInput.type = 'text';
    categoryInput.placeholder = 'Enter quote category';

    const addBtn = document.createElement('button');
    addBtn.id = 'addQuoteBtn';
    addBtn.type = 'button';
    addBtn.textContent = 'Add Quote';

    formRow.append(textInput, categoryInput, addBtn);

    // Message area for validation feedback
    const msg = document.createElement('div');
    msg.id = 'quoteMessage';
    msg.style.color = '#b00';
    msg.style.fontSize = '0.9rem';
    msg.style.minHeight = '1.2em';

    // Assemble
    app.append(display, controls, formRow, msg);
    root.appendChild(app);

    // Event bindings
    newBtn.addEventListener('click', showRandomQuote);
    addBtn.addEventListener('click', addQuote);
  }

  // Initialize once DOM is ready
  document.addEventListener('DOMContentLoaded', () => {
    createAddQuoteForm(); // programmatically build UI
    showRandomQuote();    // initial render
  });

  // Expose functions globally only if needed (e.g., if HTML uses inline onclick)
  // window.addQuote = addQuote;
  // window.showRandomQuote = showRandomQuote;
  // window.createAddQuoteForm = createAddQuoteForm;
  const category = document.getElementById('newQuoteCategory').value.trim();
  if (!text || !category) return;
  quotes.push({ text, category });
  document.getElementById('newQuoteText').value = '';
  document.getElementById('newQuoteCategory').value = '';
  showRandomQuote();
}

document.getElementById('addQuoteBtn').addEventListener('click', addQuote);

// Show a quote on initial load
showRandomQuote();
