import axios from 'axios'
import { type RefreshTokenResponse } from 'shared/types/auth'

export const API_URL = 'https://api.cygan.lol/'

export const $api = axios.create({
    withCredentials: true,
    baseURL: API_URL
})

$api.interceptors.request.use((config) => {
    config.headers.Authorization = `Bearer ${localStorage.getItem('token') || ''}`
    return config
})

$api.interceptors.response.use((config) => {
    return config
}, async (error) => {
    const originalRequest = error.config
    if (error.response?.status === 401 && error.config && !error.config._isRetry) {
        originalRequest._isRetry = true
        try {
            const response = await axios.post<RefreshTokenResponse>(
                `${API_URL}auth/update-tokens`,
                {},
                {
                    withCredentials: true,
                    headers: { Authorization: `Bearer ${localStorage.getItem('token') || ''}` }
                })
            localStorage.setItem('token', response.data.accessToken)
            return await $api.request(originalRequest)
        } catch (e) {
            console.log('НЕ АВТОРИЗОВАН', { e })
        }
    }
    throw error
})
