import { useState } from 'react'
import { CATEGORIES } from './constants'
import { formatCurrency, capitalize } from './utils'

function TransactionList({ transactions, onDelete, selectedCategory, onCategoryChange }) {
  const [filterType, setFilterType] = useState("all");

  let filtered = transactions;
  if (filterType !== "all") {
    filtered = filtered.filter(t => t.type === filterType);
  }
  if (selectedCategory !== "all") {
    filtered = filtered.filter(t => t.category === selectedCategory);
  }

  const handleDelete = (id) => {
    if (window.confirm("Delete this transaction?")) onDelete(id);
  };

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
            {CATEGORIES.map(cat => (
              <option key={cat} value={cat}>{capitalize(cat)}</option>
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
            <th className="th-right">Amount</th>
            <th className="th-right">Action</th>
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
                {t.type === "income" ? "+" : "−"}${formatCurrency(t.amount)}
              </td>
              <td className="td-actions">
                <button className="delete-btn" onClick={() => handleDelete(t.id)}>
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
