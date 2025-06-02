import './main.css';
import {
    USER_MAIN_DATA,
    USER_ACTIVITY,
    USER_AVERAGE_SESSIONS,
    USER_PERFORMANCE
} from '../../../data.js';
import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
    LineChart, Line, RadarChart, Radar, PolarGrid, PolarAngleAxis
} from 'recharts';
import keydataImg1 from '../../assets/keydata_img1.png';
import keydataImg2 from '../../assets/keydata_img2.png';
import keydataImg3 from '../../assets/keydata_img3.png';
import keydataImg4 from '../../assets/keydata_img4.png';

const userId = 12;

const userMain = USER_MAIN_DATA.find(user => user.id === userId);
const userActivity = USER_ACTIVITY.find(activity => activity.userId === userId);

const sessions = userActivity?.sessions?.map((session, idx) => ({
    ...session,
    day: idx + 1 // Pour avoir 1, 2, 3... sur l'axe X
})) || [];

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

// 2ème graphique
const userAverageSessions = USER_AVERAGE_SESSIONS.find(u => u.userId === userId)?.sessions || [];
const days = ['L', 'M', 'M', 'J', 'V', 'S', 'D'];
const averageSessionsData = userAverageSessions.map((session, idx) => ({
    ...session,
    dayLabel: days[idx]
}));

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

// 3ème graphique
const userPerformance = USER_PERFORMANCE.find(u => u.userId === userId);

const performanceData = userPerformance
    ? userPerformance.data.map(item => ({
        value: item.value,
        kind: userPerformance.kind[item.kind] // Utilise le mapping déjà présent dans les données
    }))
    : [];

const Main = () => {
    const firstName = userMain?.userInfos?.firstName;
    const keyData = userMain?.keyData;

    return (
        <main className='main'>
            <h1>
                Bonjour <span className="firstname">{firstName}</span>
            </h1>
            <div className="all-container">
                {/* 1er graphique : BarChart sur 3 colonnes */}
                <div className="recharts-container">
                    <h2>Activité quotidienne</h2>
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={sessions} barGap={8}>
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
                            <YAxis
                                yAxisId="cal"
                                dataKey="calories"
                                hide={true}
                            />
                            <Tooltip content={<CustomTooltip />} />
                            <Legend
                                verticalAlign="top"
                                align="right"
                                iconType="circle"
                                formatter={(value) =>
                                    value === "kilogram"
                                        ? <span style={{ color: "#282D30" }}>Poids (kg)</span>
                                        : <span style={{ color: "#E60000" }}>Calories brûlées (kCal)</span>
                                }
                            />
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

                {/* 2ème graphique : LineChart colonne 1, ligne 2 */}
                <div className="average-sessions-card">
                    <div className="average-sessions-title">Durée moyenne des sessions</div>
                    <ResponsiveContainer width="100%" height={200}>
                        <LineChart data={averageSessionsData}>
                            <XAxis dataKey="dayLabel" axisLine={false} tickLine={false} stroke="#fff" />
                            <Tooltip content={<CustomAverageTooltip />} />
                            <Line type="monotone" dataKey="sessionLength" stroke="#fff" strokeWidth={2} dot={false} activeDot={{ r: 6, fill: "#fff" }} />
                        </LineChart>
                    </ResponsiveContainer>
                </div>

                {/* 3ème graphique : RadarChart colonne 2, ligne 2 */}
                <div className="radar-card">
                    <ResponsiveContainer width="100%" height={250}>
                        <RadarChart data={performanceData}>
                            <PolarGrid />
                            <PolarAngleAxis dataKey="kind" stroke="#fff" tick={{ fontSize: 14 }} />
                            <Radar dataKey="value" stroke="#FF0101" fill="#FF0101" fillOpacity={0.7} />
                        </RadarChart>
                    </ResponsiveContainer>
                </div>

                {/* 4ème graphique : Score (a faire) (exemple pour css) */}
                <div className="score-card">
                    <div style={{ textAlign: 'center', width: '100%' }}>
                        <div style={{ fontWeight: 'bold', fontSize: 24, marginBottom: 10 }}>Score</div>
                        <div style={{ fontSize: 32, color: '#E60000', fontWeight: 'bold' }}>12%</div>
                        <div style={{ fontSize: 16, color: '#888' }}>de votre objectif</div>
                    </div>
                </div>

                {/* Keydata : colonne 4, sur toute la hauteur */}
                {keyData && (
                    <div className="keydata-container">
                        <div className="keydata-item">
                            <img src={keydataImg1} alt="calories" />
                            <div>
                                <strong>{keyData.calorieCount}kCal</strong>
                                <div>Calories</div>
                            </div>
                        </div>
                        <div className="keydata-item">
                            <img src={keydataImg2} alt="protéines" />
                            <div>
                                <strong>{keyData.proteinCount}g</strong>
                                <div>Protéines</div>
                            </div>
                        </div>
                        <div className="keydata-item">
                            <img src={keydataImg3} alt="glucides" />
                            <div>
                                <strong>{keyData.carbohydrateCount}g</strong>
                                <div>Glucides</div>
                            </div>
                        </div>
                        <div className="keydata-item">
                            <img src={keydataImg4} alt="lipides" />
                            <div>
                                <strong>{keyData.lipidCount}g</strong>
                                <div>Lipides</div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </main>
    )
}

export default Main;