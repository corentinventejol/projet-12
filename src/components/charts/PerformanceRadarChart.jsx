import { useState, useEffect } from 'react';
import { RadarChart, Radar, PolarGrid, PolarAngleAxis, ResponsiveContainer } from 'recharts';

function PerformanceRadarChart({ data }) {
    if (!data || !data.data || !data.kind) return null;

    const formattedData = data.data.map(item => ({
        value: item.value,
        kind: data.kind[item.kind]
    }));

    // Ajout : gestion du responsive pour outerRadius
    const [outerRadius, setOuterRadius] = useState("70%");

    useEffect(() => {
        function handleResize() {
            if (window.innerWidth < 1400) {
                setOuterRadius("50%");
            } else {
                setOuterRadius("70%");
            }
        }
        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return (
        <div className="radar-card">
            <ResponsiveContainer width="100%" height="100%">
                <RadarChart data={formattedData} outerRadius={outerRadius}>
                    <PolarGrid />
                    <PolarAngleAxis 
                        dataKey="kind" 
                        stroke="#fff" 
                        tick={{ fontSize: 10, fill: "#fff" }}
                    />
                    <Radar dataKey="value" stroke="#FF0101" fill="#FF0101" fillOpacity={0.7} />
                </RadarChart>
            </ResponsiveContainer>
        </div>
    );
}

export default PerformanceRadarChart;