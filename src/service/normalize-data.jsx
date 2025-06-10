import { USER_MAIN_DATA, USER_ACTIVITY, USER_AVERAGE_SESSIONS, USER_PERFORMANCE } from '../../data'
import axios from 'axios';

const useApi = import.meta.env.VITE_USE_API === 'true';
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';
const DEFAULT_USER_ID = 12;

export async function normalizeUsers() {
    const useApi = import.meta.env.VITE_USE_API === 'true';
    const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

    if (useApi) {
        try {
            const response = await axios.get(`${API_URL}/user`);
            const users = response.data && response.data.data ? response.data.data : [];
            return users.map(user => ({
                id: user.id,
                firstName: user.userInfos.firstName,
                lastName: user.userInfos.lastName,
                age: user.userInfos.age,
                score: user.score || user.todayScore || 0,
                keyData: user.keyData
            }));
        } catch (error) {
            console.error('Erreur API normalizeUsers:', error);
            return [];
        }
    } else {
        return USER_MAIN_DATA.map(user => ({
            id: user.id,
            firstName: user.userInfos.firstName,
            lastName: user.userInfos.lastName,
            age: user.userInfos.age,
            score: user.score || user.todayScore || 0,
            keyData: user.keyData
        }));
    }
}

export async function normalizeActivity(userId = DEFAULT_USER_ID) {
    if (useApi) {
        try {
            const response = await axios.get(`${API_URL}/user/${userId}/activity`);
            const user = response.data && response.data.data ? response.data.data : null;
            return user
                ? {
                    userId: user.userId,
                    sessions: user.sessions.map(session => ({
                        day: session.day,
                        kilogram: session.kilogram,
                        calories: session.calories
                    }))
                }
                : null;
        } catch (error) {
            console.error('Erreur API activity:', error);
            return null;
        }
    } else {
        const user = USER_ACTIVITY.find(activity => activity.userId === userId);
        return user
            ? {
                userId: user.userId,
                sessions: user.sessions.map(session => ({
                    day: session.day,
                    kilogram: session.kilogram,
                    calories: session.calories
                }))
            }
            : null;
    }
}

export async function normalizeAverageSessions(userId = DEFAULT_USER_ID) {
    if (useApi) {
        try {
            const response = await axios.get(`${API_URL}/user/${userId}/average-sessions`);
            const user = response.data && response.data.data ? response.data.data : null;
            return user ? user.sessions.map(s => ({
                day: s.day,
                sessionLength: s.sessionLength
            })) : [];
        } catch (error) {
            console.error('Erreur API average-sessions:', error);
            return [];
        }
    } else {
        const user = USER_AVERAGE_SESSIONS.find(session => session.userId === userId);
        return user ? user.sessions.map(s => ({
            day: s.day,
            sessionLength: s.sessionLength
        })) : [];
    }
}

export async function normalizePerformance(userId = DEFAULT_USER_ID) {
    if (useApi) {
        try {
            const response = await axios.get(`${API_URL}/user/${userId}/performance`);
            const user = response.data && response.data.data ? response.data.data : null;
            return user
                ? {
                    userId: user.userId,
                    kind: user.kind,
                    data: user.data.map(d => ({
                        value: d.value,
                        kind: d.kind
                    }))
                }
                : { userId: userId, kind: {}, data: [] };
        } catch (error) {
            console.error('Erreur API performance:', error);
            return { userId: userId, kind: {}, data: [] };
        }
    } else {
        const user = USER_PERFORMANCE.find(performance => performance.userId === userId);
        return user
            ? {
                userId: user.userId,
                kind: user.kind,
                data: user.data.map(d => ({
                    value: d.value,
                    kind: d.kind
                }))
            }
            : { userId: userId, kind: {}, data: [] };
    }
}

export async function normalizeScore(userId = DEFAULT_USER_ID) {
    if (useApi) {
        try {
            const response = await axios.get(`${API_URL}/user/${userId}`);
            const user = response.data && response.data.data ? response.data.data : null;
            return user ? user.score || user.todayScore || 0 : 0;
        } catch (error) {
            console.error('Erreur API score:', error);
            return 0;
        }
    } else {
        const user = USER_MAIN_DATA.find(user => user.id === userId);
        return user ? user.score || user.todayScore || 0 : 0;
    }
}

export async function normalizeKeyData(userId = DEFAULT_USER_ID) {
    if (useApi) {
        try {
            const response = await axios.get(`${API_URL}/user/${userId}`);
            const user = response.data && response.data.data ? response.data.data : null;
            return user ? user.keyData : null;
        } catch (error) {
            console.error('Erreur API keyData:', error);
            return null;
        }
    } else {
        const user = USER_MAIN_DATA.find(user => user.id === userId);
        return user ? user.keyData : null;
    }
}

export async function normalizeFirstName(userId = DEFAULT_USER_ID) {
    if (useApi) {
        try {
            const response = await axios.get(`${API_URL}/user/${userId}`);
            const user = response.data && response.data.data ? response.data.data : null;
            return user ? user.userInfos.firstName : '';
        } catch (error) {
            console.error('Erreur API firstName:', error);
            return '';
        }
    } else {
        const user = USER_MAIN_DATA.find(user => user.id === userId);
        return user ? user.userInfos.firstName : '';
    }
}