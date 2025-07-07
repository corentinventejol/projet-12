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
    const [hoveredIndex, setHoveredIndex] = useState(null);

    useEffect(() => {
        function handleResize() {
            if (window.innerWidth < 1400) {
                setChartMargin({ bottom: 30, left: 5, right: 5, top: 7 });
                setChartHeight(150);
            } else {
                setChartMargin({ bottom: 0, left: 5, right: 5, top: 7 });
                setChartHeight(200);
            }
        }
        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    // Tableau des jours de la semaine pour l'affichage sous la courbe
    const days = ['L', 'M', 'M', 'J', 'V', 'S', 'D'];

    // Calculer la position X basée sur le jour avec marges du graphique
    const getDayPosition = (index) => {
        if (index === null || !data.length) return 0;
        
        // Pourcentage de marge à gauche et à droite du graphique
        const leftMargin = 5; // ~5% de marge à gauche
        const rightMargin = 5; // ~5% de marge à droite
        const chartWidth = 100 - leftMargin - rightMargin; // 90% de largeur utile
        
        // Position relative dans le graphique (0 à 1)
        const relativePosition = index / (data.length - 1);
        
        // Position finale avec marges
        return leftMargin + (relativePosition * chartWidth);
    };

    const handleMouseMove = (e) => {
        const index = e.activeTooltipIndex;
        if (index !== undefined) {
            setHoveredIndex(index);
        }
    };

    const handleMouseLeave = () => {
        setHoveredIndex(null);
    };

    return (
        <div 
            className="average-sessions-card" 
            style={{ position: 'relative', overflow: 'hidden' }}
        >
            <div className="average-sessions-title">Durée moyenne des sessions</div>
            <ResponsiveContainer width="100%" height={chartHeight}>
                <LineChart
                    data={data}
                    margin={chartMargin}
                    onMouseMove={handleMouseMove}
                    onMouseLeave={handleMouseLeave}
                >
                    <XAxis
                        dataKey="day"
                        axisLine={false}
                        tickLine={false}
                        stroke="#fff"
                        tickFormatter={day => days[day - 1]}
                    />
                    
                    <Tooltip content={<CustomAverageTooltip />} />
                    <Line 
                        type="monotone" 
                        dataKey="sessionLength" 
                        stroke="#fff" 
                        strokeWidth={2} 
                        dot={false} 
                        activeDot={{ 
                            r: 6, 
                            fill: "#fff",
                            stroke: "rgba(255, 255, 255, 0.2)",
                            strokeWidth: 10
                        }} 
                    />
                </LineChart>
            </ResponsiveContainer>
            
            {hoveredIndex !== null && (
                <div 
                    style={{
                        position: 'absolute',
                        top: '0',
                        left: `${getDayPosition(hoveredIndex)}%`,
                        width: `${100 - getDayPosition(hoveredIndex)}%`,
                        height: '100%',
                        backgroundColor: 'rgba(0,0,0,0.1)',
                        pointerEvents: 'none',
                        zIndex: 1
                    }}
                />
            )}
        </div>
    );
}

export default AverageSessionsChart;