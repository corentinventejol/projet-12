import { useState, useEffect } from 'react';
import { RadarChart, Radar, PolarGrid, PolarAngleAxis, ResponsiveContainer } from 'recharts';

function PerformanceRadarChart({ data }) {
    if (!data || !data.data || !data.kind) return null;

    const formattedData = data.data.map(item => ({
        value: item.value,
        kind: data.kind[item.kind]
    }));

    const [outerRadius, setOuterRadius] = useState("70%");
    const [polarRadius, setPolarRadius] = useState([20, 40, 60, 80]);

    useEffect(() => {
        function handleResize() {
            if (window.innerWidth < 1400) {
                setOuterRadius("60%");
                setPolarRadius([8, 16, 24, 32]);
            } else {
                setOuterRadius("80%");
                setPolarRadius([16, 32, 48, 64]);
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
                    <PolarGrid 
                        polarRadius={polarRadius}
                        stroke="#fff"
                    />
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