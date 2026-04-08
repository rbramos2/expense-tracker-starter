import { useState } from 'react'

const categories = ["food", "housing", "utilities", "transport", "entertainment", "salary", "other"];

function fmt(n) {
  return n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

function TransactionList({ transactions, onDelete, selectedCategory, onCategoryChange }) {
  const [filterType, setFilterType] = useState("all");

  let filtered = transactions;
  if (filterType !== "all") {
    filtered = filtered.filter(t => t.type === filterType);
  }
  if (selectedCategory !== "all") {
    filtered = filtered.filter(t => t.category === selectedCategory);
  }

  return (
    <div className="transactions">
      <div className="transactions-header">
        <h2>Transactions</h2>
        <div className="filters">
          <select value={filterType} onChange={(e) => setFilterType(e.target.value)}>
            <option value="all">All Types</option>
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>
          <select value={selectedCategory} onChange={(e) => onCategoryChange(e.target.value)}>
            <option value="all">All Categories</option>
            {categories.map(cat => (
              <option key={cat} value={cat}>{cat.charAt(0).toUpperCase() + cat.slice(1)}</option>
            ))}
          </select>
        </div>
      </div>

      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Description</th>
            <th>Category</th>
            <th style={{ textAlign: 'right' }}>Amount</th>
            <th style={{ textAlign: 'right' }}>Action</th>
          </tr>
        </thead>
        <tbody>
          {filtered.length === 0 && (
            <tr>
              <td colSpan={5} className="empty-state">No transactions found</td>
            </tr>
          )}
          {filtered.map(t => (
            <tr key={t.id}>
              <td className="td-date">{t.date}</td>
              <td className="td-description">{t.description}</td>
              <td><span className="category-badge">{t.category}</span></td>
              <td className={`amount-cell ${t.type === "income" ? "income-amount" : "expense-amount"}`}>
                {t.type === "income" ? "+" : "−"}${fmt(t.amount)}
              </td>
              <td className="td-actions">
                <button
                  className="delete-btn"
                  onClick={() => {
                    if (window.confirm("Delete this transaction?")) onDelete(t.id);
                  }}
                >
                  Remove
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TransactionList;
