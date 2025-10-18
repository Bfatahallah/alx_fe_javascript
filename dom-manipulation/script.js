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
  const text = document.getElementById('newQuoteText').value.trim();
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
