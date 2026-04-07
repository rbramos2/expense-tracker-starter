# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
# Install dependencies (requires nvm)
source ~/.nvm/nvm.sh && npm install

# Start dev server
source ~/.nvm/nvm.sh && npm run dev   # http://localhost:5173

# Lint
source ~/.nvm/nvm.sh && npm run lint

# Build for production
source ~/.nvm/nvm.sh && npm run build
```

## Architecture

This is a single-file React app — all logic and UI lives in `src/App.jsx`. There are no separate components, routing, or data persistence layer; state is held in `useState` and resets on page reload.

**Known intentional issues (part of a course exercise):**
- A bug in the income/expense calculation (amounts stored as strings, not numbers)
- Poor UI styling
- Messy, unstructured code

The `categories` array and transaction shape (`id`, `description`, `amount`, `type`, `category`, `date`) are the core data model.
