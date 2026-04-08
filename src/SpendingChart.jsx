import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

const COLORS = ['#C49A3C', '#4BA87A', '#5E9FE0', '#B06BD5', '#E88A5C', '#5BC4B0', '#D45F5F', '#7B9CE8'];

const tooltipStyle = {
  contentStyle: {
    background: '#191D2C',
    border: '1px solid rgba(255,255,255,0.08)',
    borderRadius: '8px',
    color: '#E8E3D8',
    fontFamily: 'JetBrains Mono, monospace',
    fontSize: '12px',
    boxShadow: '0 8px 24px rgba(0,0,0,0.4)',
  },
  labelStyle: {
    color: '#7580A0',
    fontFamily: 'Sora, sans-serif',
    fontSize: '11px',
    marginBottom: '4px',
    textTransform: 'capitalize',
  },
  cursor: { fill: 'rgba(255,255,255,0.025)' },
};

function SpendingChart({ transactions, selectedCategory, onCategoryClick }) {
  const expensesByCategory = transactions
    .filter(t => t.type === 'expense')
    .reduce((acc, t) => {
      acc[t.category] = (acc[t.category] || 0) + parseFloat(t.amount);
      return acc;
    }, {});

  const data = Object.entries(expensesByCategory).map(([name, value]) => ({ name, value }));

  if (data.length === 0) return null;

  const handleBarClick = (entry) => {
    const clicked = entry?.name;
    if (!clicked) return;
    onCategoryClick(clicked === selectedCategory ? 'all' : clicked);
  };

  return (
    <div className="chart-section">
      <h2>Spending by Category</h2>
      {selectedCategory !== 'all' ? (
        <p className="chart-filter-hint">
          Filtered by <strong style={{ color: '#E8E3D8' }}>{selectedCategory}</strong> — click again or{' '}
          <button className="clear-filter-btn" onClick={() => onCategoryClick('all')}>clear filter</button>
        </p>
      ) : (
        <p className="chart-filter-hint" style={{ marginBottom: 16 }}>
          Click a bar to filter transactions by category
        </p>
      )}
      <ResponsiveContainer width="100%" height={280}>
        <BarChart data={data} margin={{ top: 8, right: 16, left: 0, bottom: 4 }} barCategoryGap="35%">
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.045)" vertical={false} />
          <XAxis
            dataKey="name"
            tick={{ fill: '#3E4660', fontSize: 11, fontFamily: 'Sora, sans-serif' }}
            axisLine={{ stroke: 'rgba(255,255,255,0.06)' }}
            tickLine={false}
          />
          <YAxis
            tickFormatter={(v) => `$${v}`}
            tick={{ fill: '#3E4660', fontSize: 11, fontFamily: 'JetBrains Mono, monospace' }}
            axisLine={false}
            tickLine={false}
            width={52}
          />
          <Tooltip
            formatter={(value) => [`$${value.toFixed(2)}`, 'Amount']}
            {...tooltipStyle}
          />
          <Bar dataKey="value" name="Amount" onClick={handleBarClick} style={{ cursor: 'pointer' }} radius={[4, 4, 0, 0]}>
            {data.map((entry, index) => (
              <Cell
                key={entry.name}
                fill={COLORS[index % COLORS.length]}
                opacity={selectedCategory === 'all' || selectedCategory === entry.name ? 1 : 0.2}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default SpendingChart;
