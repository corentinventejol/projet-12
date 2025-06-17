import './main.css';
import { useEffect, useState } from 'react';
import { normalizeActivity, normalizeAverageSessions, normalizePerformance, normalizeScore, normalizeKeyData, normalizeUsers } from '../../service/normalize-data.jsx';
import ActivityChart from '../charts/ActivityChart.jsx';
import AverageSessionsChart from '../charts/AverageSessionsChart';
import PerformanceRadarChart from '../charts/PerformanceRadarChart';
import ScoreChart from '../charts/ScoreChart';
import keydataImg1 from '../../assets/keydata_img1.png';
import keydataImg2 from '../../assets/keydata_img2.png';
import keydataImg3 from '../../assets/keydata_img3.png';
import keydataImg4 from '../../assets/keydata_img4.png';

function Main({ userId }) {
    const [activityData, setActivityData] = useState(null);
    const [averageSessionsData, setAverageSessionsData] = useState([]);
    const [performanceData, setPerformanceData] = useState(null);
    const [score, setScore] = useState(0);
    const [keyData, setKeyData] = useState(null);
    const [firstName, setFirstName] = useState('');

    useEffect(() => {
        async function fetchData() {
            // Récupère les infos utilisateur depuis l'API ou mock
            const userKeyData = await normalizeKeyData(userId);
            setKeyData(userKeyData);

            // Récupère le prénom et le score
            const users = await normalizeUsers(userId);
            const user = users[0];
            if (user) {
                setFirstName(user.firstName);
                setScore(user.score);
            }

            const activity = await normalizeActivity(userId);
            setActivityData(activity);

            const averageSessions = await normalizeAverageSessions(userId);
            setAverageSessionsData(averageSessions);

            const performance = await normalizePerformance(userId);
            setPerformanceData(performance);
        }
        fetchData();
    }, [userId]);

    return (
        <main className='main'>
            <h1>
                Bonjour <span className="firstname">{firstName}</span>
            </h1>
            <div className="all-container">
                {activityData && <ActivityChart data={activityData.sessions} />}
                <div className="charts-bottom-grid">
                    <AverageSessionsChart data={averageSessionsData} />
                    {performanceData && <PerformanceRadarChart data={performanceData} />}
                    <ScoreChart score={score} />
                </div>
                {keyData && (
                    <div className="keydata-container">
                        <div className="keydata-item">
                            <img className='keydata-item-calories' src={keydataImg1} alt="calories" />
                            <div>
                                <strong>{keyData.calorieCount}kCal</strong>
                                <div>Calories</div>
                            </div>
                        </div>
                        <div className="keydata-item">
                            <img className='keydata-item-protein' src={keydataImg2} alt="protéines" />
                            <div>
                                <strong>{keyData.proteinCount}g</strong>
                                <div>Protéines</div>
                            </div>
                        </div>
                        <div className="keydata-item">
                            <img className='keydata-item-glucides' src={keydataImg3} alt="glucides" />
                            <div>
                                <strong>{keyData.carbohydrateCount}g</strong>
                                <div>Glucides</div>
                            </div>
                        </div>
                        <div className="keydata-item">
                            <img className='keydata-item-lipides' src={keydataImg4} alt="lipides" />
                            <div>
                                <strong>{keyData.lipidCount}g</strong>
                                <div>Lipides</div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </main>
    );
}

export default Main;