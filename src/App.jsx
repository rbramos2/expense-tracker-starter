import { useState } from 'react'
import './App.css'
import Summary from './Summary'
import TransactionForm from './TransactionForm'
import TransactionList from './TransactionList'
import SpendingChart from './SpendingChart'
import Login from './Login'

const TODAY = new Date().toLocaleDateString('en-US', {
  weekday: 'long',
  year: 'numeric',
  month: 'long',
  day: 'numeric',
});

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(() => !!localStorage.getItem('ft_auth'));
  const [userEmail, setUserEmail] = useState(() => localStorage.getItem('ft_user') || '');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [transactions, setTransactions] = useState([
    { id: 1, description: "Salary",        amount: 5000, type: "income",  category: "salary",        date: "2025-01-01" },
    { id: 2, description: "Rent",           amount: 1200, type: "expense", category: "housing",       date: "2025-01-02" },
    { id: 3, description: "Groceries",      amount: 150,  type: "expense", category: "food",          date: "2025-01-03" },
    { id: 4, description: "Freelance Work", amount: 800,  type: "income",  category: "salary",        date: "2025-01-05" },
    { id: 5, description: "Electric Bill",  amount: 95,   type: "expense", category: "utilities",     date: "2025-01-06" },
    { id: 6, description: "Dinner Out",     amount: 65,   type: "expense", category: "food",          date: "2025-01-07" },
    { id: 7, description: "Gas",            amount: 45,   type: "expense", category: "transport",     date: "2025-01-08" },
    { id: 8, description: "Netflix",        amount: 15,   type: "expense", category: "entertainment", date: "2025-01-10" },
  ]);

  const handleLogin = (email) => {
    localStorage.setItem('ft_auth', '1');
    localStorage.setItem('ft_user', email);
    setUserEmail(email);
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('ft_auth');
    localStorage.removeItem('ft_user');
    setIsLoggedIn(false);
    setUserEmail('');
  };

  const handleAdd = (t) => setTransactions(prev => [...prev, t]);
  const handleDelete = (id) => setTransactions(prev => prev.filter(t => t.id !== id));

  if (!isLoggedIn) {
    return <Login onLogin={handleLogin} />;
  }

  const avatarLetter = userEmail ? userEmail.charAt(0).toUpperCase() : 'U';

  return (
    <div className="app">
      <header className="app-header">
        <div className="app-header-left">
          <div className="app-monogram">FT</div>
          <div>
            <h1>Finance Tracker</h1>
            <p className="subtitle">Personal expense management</p>
          </div>
        </div>
        <div className="app-header-right">
          <div className="app-date">{TODAY}</div>
          <div className="user-section">
            <div className="user-avatar" title={userEmail}>{avatarLetter}</div>
            <button className="logout-btn" onClick={handleLogout}>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4"/>
                <polyline points="16 17 21 12 16 7"/>
                <line x1="21" y1="12" x2="9" y2="12"/>
              </svg>
              Sign out
            </button>
          </div>
        </div>
      </header>

      <Summary transactions={transactions} />
      <SpendingChart
        transactions={transactions}
        selectedCategory={selectedCategory}
        onCategoryClick={setSelectedCategory}
      />
      <TransactionForm onAdd={handleAdd} />
      <TransactionList
        transactions={transactions}
        onDelete={handleDelete}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
      />
    </div>
  );
}

export default App
