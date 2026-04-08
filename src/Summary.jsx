import { formatCurrency } from './utils';

function Summary({ transactions }) {
  const totalIncome = transactions
    .filter(t => t.type === "income")
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpenses = transactions
    .filter(t => t.type === "expense")
    .reduce((sum, t) => sum + t.amount, 0);

  const balance = totalIncome - totalExpenses;

  return (
    <div className="summary">
      <div className="summary-card income-card">
        <h3>Total Income</h3>
        <p className="summary-value income-amount">${formatCurrency(totalIncome)}</p>
      </div>
      <div className="summary-card expense-card">
        <h3>Total Expenses</h3>
        <p className="summary-value expense-amount">${formatCurrency(totalExpenses)}</p>
      </div>
      <div className="summary-card balance-card">
        <h3>Net Balance</h3>
        <p className={`summary-value ${balance >= 0 ? 'balance-amount' : 'balance-negative'}`}>
          {balance >= 0 ? '' : '−'}${formatCurrency(Math.abs(balance))}
        </p>
      </div>
    </div>
  );
}

export default Summary;
