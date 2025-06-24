import { useState, useEffect } from 'react';
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
    const [chartMargin, setChartMargin] = useState({ bottom: 100 });
    const [chartHeight, setChartHeight] = useState(200);

    useEffect(() => {
        function handleResize() {
            if (window.innerWidth < 1400) {
                setChartMargin({ bottom: 30, left: 0, right: 0 });
                setChartHeight(150);
            } else {
                setChartMargin({ bottom: 0, left: 30, right: 30 });
                setChartHeight(200);
            }
        }
        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    // Tableau des jours de la semaine pour l'affichage sous la courbe
    const days = ['L', 'M', 'M', 'J', 'V', 'S', 'D'];

    return (
        <div className="average-sessions-card">
            <div className="average-sessions-title">Durée moyenne des sessions</div>
            <ResponsiveContainer width="100%" height={chartHeight}>
                <LineChart
                    data={data}
                    margin={chartMargin}
                >
                    <XAxis
                        dataKey="day"
                        axisLine={false}
                        tickLine={false}
                        stroke="#fff"
                        tickFormatter={day => days[day - 1]}
                    />
                    <Tooltip content={<CustomAverageTooltip />} />
                    <Line type="monotone" dataKey="sessionLength" stroke="#fff" strokeWidth={2} dot={false} activeDot={{ r: 6, fill: "#fff" }} />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
}

export default AverageSessionsChart;