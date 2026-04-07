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

React + Vite app with no routing and no data persistence — state resets on page reload.

**Component structure:**
- `App.jsx` — holds the `transactions` array in state, renders the three child components
- `Summary.jsx` — receives `transactions` as a prop, computes and displays totals (income, expenses, balance)
- `TransactionForm.jsx` — owns its own form state, calls `onAdd(transaction)` prop when submitted
- `TransactionList.jsx` — receives `transactions` as a prop, owns its own filter state (type/category)

The `categories` array is duplicated in `TransactionForm.jsx` and `TransactionList.jsx`. The transaction shape is `{ id, description, amount, type, category, date }` where `amount` is a number.
