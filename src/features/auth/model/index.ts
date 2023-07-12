import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'

export interface useAuthStateType {
    email: string
    isAuth: boolean
    userId: number
    setUserId: (userId: number) => void
    setEmail: (email: string) => void
    setAuth: (isAuth: boolean) => void
}
export const useAuth = create(immer<useAuthStateType>((set) => ({
    email: '',
    userId: 0,
    isAuth: false,
    setEmail: (email: string) => {
        set(state => {
            state.email = email
        })
    },
    setAuth: (isAuth: boolean) => {
        set(state => {
            state.isAuth = isAuth
        })
    },
    setUserId: (userId: number) => {
        set(state => {
            state.userId = userId
        })
    }
})))
