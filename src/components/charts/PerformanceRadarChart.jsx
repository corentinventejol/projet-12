import { RadarChart, Radar, PolarGrid, PolarAngleAxis, ResponsiveContainer } from 'recharts';

function PerformanceRadarChart({ data }) {
    if (!data || !data.data || !data.kind) return null;

    const formattedData = data.data.map(item => ({
        value: item.value,
        kind: data.kind[item.kind]
    }));

    return (
        <div className="radar-card">
            <ResponsiveContainer width="100%" height={250}>
                <RadarChart data={formattedData}>
                    <PolarGrid />
                    <PolarAngleAxis dataKey="kind" stroke="#fff" tick={{ fontSize: 14 }} />
                    <Radar dataKey="value" stroke="#FF0101" fill="#FF0101" fillOpacity={0.7} />
                </RadarChart>
            </ResponsiveContainer>
        </div>
    );
}

export default PerformanceRadarChart;