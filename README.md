# PrecisionHint-Extension

This project contains a **Node.js backend server** and a **Chrome extension** that together provide intelligent hints for DSA (Data Structures & Algorithms) problems on sites like LeetCode and GeeksforGeeks. <br>
The backend uses the **Gemini API** to generate high-quality, contextual hints. The Chrome extension injects these hints directly into the problem pages.

## Features

- Chrome Extension:
    - Injects hint button into supported problem pages.
    - Fetches hints for the current DSA question from your backend.
    - Displays Gemini-generated hints seamlessly in-page.
- Backend Server:
    - Accepts DSA question data from the extension.
    - Uses Gemini API to generate tailored hints.
    - Returns hints as JSON response

## Directory Structure

## Setup and Installation

#### Clone the repository

```bash
git clone https://github.com/Saumyajeet-Varma/PrecisionHint-Extension
cd PrecisionHint-Extension

```

#### Server setup

```bash
cd server
npm install
```

#### Create a `.env` file

```ini
# Server
PORT = 3000

# Gemini
GEMINI_API_KEY = YOUR_GEMINI_API_KEY

# Rate Limit
RATE_LIMIT_WINDOW_MS = 86400000
RATE_LIMIT_MAX = 50
RATE_LIMIT_MESSAGE = Too many requests from this IP

```

- **GEMINI_API_KEY**: Your Gemini API key for generating hints.
- **PORT**: Port the Express server will listen on.
- **RATE_LIMIT_WINDOW_MS**: Time window for rate limiting in milliseconds (e.g., 60000 = 1 minute).
- **RATE_LIMIT_MAX**: Maximum number of requests allowed per window.
- **RATE_LIMIT_MESSAGE**: Message returned when client exceeds the rate limit.

#### Start the Server

```bash
npm start

```

#### Extension setup

- Open Chrome and go to `chrome://extensions`.
- Enable Developer mode.
- Click Load unpacked.
- Select the `extension/` folder.

The extension will now appear in your browser and work on supported sites.

## How it works

1. User visits a supported DSA problem page.
2. Extension’s content script extracts the problem title.
3. Extension sends this data to the server.
4. Server queries Gemini with the problem text and generates hints.
5. Extension displays the returned hints in the browser.

## Contributing

Contributions are welcome! Feel free to open issues or submit PRs to improve hint quality, add sites, or enhance the extension UI.

## Author

Saumyajeet Varma • [GitHub](https://github.com/Saumyajeet-Varma)