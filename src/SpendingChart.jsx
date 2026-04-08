import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff7f7f', '#a4de6c', '#83a6ed', '#8dd1e1', '#d0ed57'];

function SpendingChart({ transactions, selectedCategory, onCategoryClick }) {
  const expensesByCategory = transactions
    .filter(t => t.type === 'expense')
    .reduce((acc, t) => {
      acc[t.category] = (acc[t.category] || 0) + parseFloat(t.amount);
      return acc;
    }, {});

  const data = Object.entries(expensesByCategory).map(([name, value]) => ({ name, value }));

  if (data.length === 0) {
    return null;
  }

  const handleBarClick = (entry) => {
    const clicked = entry?.name;
    if (!clicked) return;
    onCategoryClick(clicked === selectedCategory ? 'all' : clicked);
  };

  return (
    <div className="chart-section">
      <h2>Spending by Category</h2>
      {selectedCategory !== 'all' && (
        <p className="chart-filter-hint">
          Filtered by <strong>{selectedCategory}</strong> — click the bar again or{' '}
          <button className="clear-filter-btn" onClick={() => onCategoryClick('all')}>clear</button>
        </p>
      )}
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data} margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis tickFormatter={(v) => `$${v}`} />
          <Tooltip formatter={(value) => `$${value.toFixed(2)}`} />
          <Bar dataKey="value" name="Amount" onClick={handleBarClick} style={{ cursor: 'pointer' }}>
            {data.map((entry, index) => (
              <Cell
                key={entry.name}
                fill={COLORS[index % COLORS.length]}
                opacity={selectedCategory === 'all' || selectedCategory === entry.name ? 1 : 0.35}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default SpendingChart;
