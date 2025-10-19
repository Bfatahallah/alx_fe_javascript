# Dynamic Quote Generator

## Overview
This project is a simple web app for generating, viewing, adding, and organizing quotes. It demonstrates advanced DOM manipulation, web storage, data import/export, and simple server sync/conflict resolution—all in plain JavaScript, no framework required.

## Key Features & Tasks
- **Dynamic content**: All quotes and UI are managed with advanced direct DOM manipulation.
- **Quote categories & filtering**: View and add quotes by category, with an easy category dropdown filter.
- **Local Storage**: All quotes persist between browser sessions—your data is saved automatically.
- **Session Storage**: Remembers the last viewed quote for your session.
- **Import/Export (JSON)**: You can export your quotes as JSON (backup/share) and import them back into the app.
- **Server Sync (Simulated)**: Sync your quotes with a fake server (using JSONPlaceholder). Handles merge/conflict with 'server wins' policy.
- **Conflict Resolution**: Notifies you if categories change during sync.
- **Upload to Server (Simulated)**: Send all your quotes as a JSON array in a POST request to the fake API.

## How to Run & Test

1. **Open `dom-manipulation/index.html`** directly in any browser.
2. **Try these features:**
   - **Show New Quote**: Click to display a random quote from the selected category.
   - **Add Quote**: Enter a quote and category and click Add Quote—it will appear in the rotation and in the filter.
   - **Category Filter**: Switch categories to filter visible quotes.
   - **Export/Import**: Use Export Quotes to download your data as JSON. Use Import Quotes to load quotes from a valid JSON file.
   - **Sync with Server**: Click 'Sync with Server' to simulate fetching and merging from a remote API. You'll see a status message and any conflict alerts.
   - **Auto Sync**: Toggle auto-sync for periodic server merges.
   - **Upload Quotes**: Post your current quotes to the fake server using the Upload Quotes button (simulated only).
3. **Data Persistence**: Close and reopen the page, your quotes and last session will be remembered.

No installation or build is needed, just use your browser!
