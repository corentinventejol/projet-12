import { LineChart, Line, XAxis, Tooltip, ResponsiveContainer } from 'recharts';

const CustomAverageTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
        return (
            <div className="custom-tooltip" style={{ background: '#fff', color: '#E60000', padding: 10 }}>
                {payload[0].value} min
            </div>
        );
    }
    return null;
};

function AverageSessionsChart({ data }) {
    return (
        <div className="average-sessions-card">
            <div className="average-sessions-title">Durée moyenne des sessions</div>
            <ResponsiveContainer width="100%" height={200}>
                <LineChart data={data}>
                    <XAxis dataKey="dayLabel" axisLine={false} tickLine={false} stroke="#fff" />
                    <Tooltip content={<CustomAverageTooltip />} />
                    <Line type="monotone" dataKey="sessionLength" stroke="#fff" strokeWidth={2} dot={false} activeDot={{ r: 6, fill: "#fff" }} />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
}

export default AverageSessionsChart;