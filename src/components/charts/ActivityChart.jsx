import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
        return (
            <div className="custom-tooltip" style={{ background: '#E60000', color: '#fff', padding: 10 }}>
                <p>{payload[0].value}kg</p>
                <p>{payload[1].value}kCal</p>
            </div>
        );
    }
    return null;
};

function ActivityChart({ data }) {
    return (
        <div className="recharts-container">
            <div className="recharts-header">
                <h2>Activité quotidienne</h2>
                <div className="recharts-legend">
                    <div className="legend-item">
                        <div className="legend-dot legend-dot-weight"></div>
                        <span className="legend-text legend-text-weight">Poids (kg)</span>
                    </div>
                    <div className="legend-item">
                        <div className="legend-dot legend-dot-calories"></div>
                        <span className="legend-text legend-text-calories">Calories brûlées (kCal)</span>
                    </div>
                </div>
            </div>
            <ResponsiveContainer width="100%" height={300}>
                <BarChart data={data} barGap={8}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis dataKey="day" tickLine={false} />
                    <YAxis
                        yAxisId="kg"
                        dataKey="kilogram"
                        orientation="right"
                        axisLine={false}
                        tickLine={false}
                        domain={['dataMin - 1', 'dataMax + 1']}
                    />
                    <YAxis yAxisId="cal" dataKey="calories" hide={true} />
                    <Tooltip content={<CustomTooltip />} />
                    <Bar
                        yAxisId="kg"
                        dataKey="kilogram"
                        fill="#282D30"
                        radius={[10, 10, 0, 0]}
                        barSize={7}
                        name="kilogram"
                    />
                    <Bar
                        yAxisId="cal"
                        dataKey="calories"
                        fill="#E60000"
                        radius={[10, 10, 0, 0]}
                        barSize={7}
                        name="calories"
                    />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
}

export default ActivityChart;