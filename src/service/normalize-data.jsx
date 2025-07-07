import { USER_MAIN_DATA, USER_ACTIVITY, USER_AVERAGE_SESSIONS, USER_PERFORMANCE } from '../../data'
import axios from 'axios';

const useApi = import.meta.env.VITE_USE_API === 'true';
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

// Fonction utilitaire pour les appels API
async function fetchFromApi(endpoint) {
    try {
        const response = await axios.get(`${API_URL}${endpoint}`);
        return response.data && response.data.data ? response.data.data : null;
    } catch (error) {
        console.error(`Erreur API ${endpoint}:`, error);
        return null;
    }
}

// Fonction utilitaire pour récupérer les données utilisateur
async function getUserData(userId) {
    if (useApi) {
        return await fetchFromApi(`/user/${userId}`);
    } else {
        return USER_MAIN_DATA.find(user => user.id === userId) || null;
    }
}

export async function normalizeUsers(userId) {
    try {
        if (!userId && useApi) return [];

        const user = await getUserData(userId);
        if (!user) return [];

        return [{
            id: user.id,
            firstName: user.userInfos.firstName,
            lastName: user.userInfos.lastName,
            age: user.userInfos.age,
            score: user.score || user.todayScore || 0,
            keyData: user.keyData
        }];
    }catch (error) {
    console.error(`Erreur lors de la normalisation des données utilisateur pour l'ID ${userId}:`, error);
    }

}

export async function normalizeActivity(userId) {
    let activityData;
    
    if (useApi) {
        activityData = await fetchFromApi(`/user/${userId}/activity`);
    } else {
        activityData = USER_ACTIVITY.find(activity => activity.userId === userId);
    }
    
    return activityData ? {
        userId: activityData.userId,
        sessions: activityData.sessions.map(session => ({
            day: session.day,
            kilogram: session.kilogram,
            calories: session.calories
        }))
    } : null;
}

export async function normalizeAverageSessions(userId) {
    let sessionData;
    
    if (useApi) {
        sessionData = await fetchFromApi(`/user/${userId}/average-sessions`);
    } else {
        sessionData = USER_AVERAGE_SESSIONS.find(session => session.userId === userId);
    }
    
    return sessionData ? sessionData.sessions.map(s => ({
        day: s.day,
        sessionLength: s.sessionLength
    })) : [];
}

export async function normalizePerformance(userId) {
    let performanceData;
    
    if (useApi) {
        performanceData = await fetchFromApi(`/user/${userId}/performance`);
    } else {
        performanceData = USER_PERFORMANCE.find(performance => performance.userId === userId);
    }
    
    return performanceData ? {
        userId: performanceData.userId,
        kind: performanceData.kind,
        data: performanceData.data.map(d => ({
            value: d.value,
            kind: d.kind
        }))
    } : { userId: userId, kind: {}, data: [] };
}

export async function normalizeScore(userId) {
    const user = await getUserData(userId);
    return user ? user.score || user.todayScore || 0 : 0;
}

export async function normalizeKeyData(userId) {
    const user = await getUserData(userId);
    return user ? user.keyData : null;
}

export async function normalizeFirstName(userId) {
    const user = await getUserData(userId);
    return user ? user.userInfos.firstName : '';
}