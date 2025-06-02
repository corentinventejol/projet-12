import './main.css';
import {
    USER_MAIN_DATA,
    USER_ACTIVITY
} from '../../../data.js';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import env from 'react-dotenv';
import keydataImg1 from '../../assets/keydata_img1.png';
import keydataImg2 from '../../assets/keydata_img2.png';
import keydataImg3 from '../../assets/keydata_img3.png';
import keydataImg4 from '../../assets/keydata_img4.png';

const userId = 12;

// Choix de la source des données selon USE_API
let userMain, userActivity;
if (process.env.REACT_APP_USE_API === "true" || process.env.USE_API === "true") {
    // TODO: Ici tu mettras la récupération des données via l'API quand elle sera prête
    // Exemple :
    // userMain = ... (fetch API)
    // userActivity = ... (fetch API)
} else {
    userMain = USER_MAIN_DATA.find(user => user.id === userId);
    userActivity = USER_ACTIVITY.find(activity => activity.userId === userId);
}

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

const Main = () => {
    const firstName = userMain?.userInfos?.firstName;
    const keyData = userMain?.keyData;

    return (
        <main className='main'>
            <h1>
                Bonjour <span className="firstname">{firstName}</span>
            </h1>
            <div className="all-container">
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
                {keyData && (
                    <div className="keydata-container" style={{ display: 'flex', gap: '2rem', marginTop: '2rem' }}>
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