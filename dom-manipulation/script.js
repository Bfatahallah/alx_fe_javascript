let quotes = [];
const defaultQuotes = [
  { text: "The best way to get started is to quit talking and begin doing.", category: "Motivation" },
  { text: "Success is not in what you have, but who you are.", category: "Success" },
  { text: "To handle yourself, use your head; to handle others, use your heart.", category: "Wisdom" },
];

function saveQuotes() {
  localStorage.setItem('quotes', JSON.stringify(quotes));
}

function loadQuotes() {
  try {
    const stored = localStorage.getItem('quotes');
    return stored ? JSON.parse(stored) : [...defaultQuotes];
  } catch (e) {
    return [...defaultQuotes];
  }
}

quotes = loadQuotes();

// Gets the current selected value of the category dropdown
function selectedCategory() {
  const sel = document.getElementById('categoryFilter');
  return sel ? sel.value : 'all';
}

// category filter logic: just simple populate and change handling
function getAllCategories() {
  // collect all categories from the quotes array (no duplicates)
  const cats = quotes.map(q => q.category).filter(c => !!c);
  return Array.from(new Set(cats));
}

function populateCategories() {
  const sel = document.getElementById('categoryFilter');
  if (!sel) return;
  sel.innerHTML = '';
  const all = document.createElement('option');
  all.value = 'all';
  all.text = 'All';
  sel.appendChild(all);
  getAllCategories().forEach(cat => {
    const opt = document.createElement('option');
    opt.value = cat;
    opt.text = cat;
    sel.appendChild(opt);
  });
}

function filterQuote() {
  const cat = selectedCategory();
  if (!cat || cat === 'all') return quotes;
  return quotes.filter(q => q.category === cat);
}

// For session persistence
function saveLastViewedQuote(index) {
  sessionStorage.setItem('lastViewedQuote', index);
}
function getLastViewedQuote() {
  const idx = sessionStorage.getItem('lastViewedQuote');
  return idx !== null ? parseInt(idx) : null;
}

function showRandomQuote() {
  const display = document.getElementById('quoteDisplay');
  const filtered = filterQuote();
  if (!filtered.length) {
    display.textContent = 'No quotes for this category!';
    return;
  }
  let idx = Math.floor(Math.random() * filtered.length);
  display.textContent = `"${filtered[idx].text}" [${filtered[idx].category}]`;
  saveLastViewedQuote(idx);
}

window.addEventListener('DOMContentLoaded', () => {
  populateCategories();
  const catSel = document.getElementById('categoryFilter');
  if (catSel) catSel.addEventListener('change', showRandomQuote);
  const idx = getLastViewedQuote();
  const display = document.getElementById('quoteDisplay');
  if (quotes.length && idx !== null && idx >= 0 && idx < quotes.length) {
    display.textContent = `"${quotes[idx].text}" [${quotes[idx].category}]`;
  } else {
    showRandomQuote();
  }
});

document.getElementById('newQuote').addEventListener('click', showRandomQuote);
document.getElementById('addQuoteBtn').addEventListener('click', addQuote);
function addQuote() {
  const textEl = document.getElementById('newQuoteText');
  const catEl = document.getElementById('newQuoteCategory');
  const msgEl = document.getElementById('quoteMessage');
  const text = textEl.value.trim();
  const category = catEl.value.trim();
  if (!text || !category) {
    msgEl.textContent = 'Please enter both a quote and a category.';
    return;
  }
  quotes.push({ text, category });
  saveQuotes();
  populateCategories(); // update dropdown with new category if needed
  textEl.value = '';
  catEl.value = '';
  msgEl.textContent = 'Quote added!';
  showRandomQuote();
}

document.getElementById('exportBtn').addEventListener('click', exportQuotes);
function exportQuotes() {
  const data = JSON.stringify(quotes, null, 2);
  const blob = new Blob([data], {type: 'application/json'});
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'quotes.json';
  document.body.appendChild(a);
  a.click();
  setTimeout(() => {
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }, 0);
}

document.getElementById('importFile').addEventListener('change', importFromJsonFile);
function importFromJsonFile(event) {
  const file = event.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = function(e) {
    try {
      const importedQuotes = JSON.parse(e.target.result);
      if (!Array.isArray(importedQuotes)) throw new Error();
      let added = 0;
      for (const q of importedQuotes) {
        if (q && typeof q.text === 'string' && typeof q.category === 'string') {
          quotes.push({ text: q.text.trim(), category: q.category.trim() });
          added++;
        }
      }
      if (added > 0) {
        saveQuotes();
        populateCategories();
        alert('Quotes imported successfully!');
        showRandomQuote();
      } else {
        alert('No valid quotes found in the selected file.');
      }
    } catch {
      alert('Failed to import: the file is not valid JSON or not in the right format.');
    }
    event.target.value = '';
  };
  reader.readAsText(file);
}
