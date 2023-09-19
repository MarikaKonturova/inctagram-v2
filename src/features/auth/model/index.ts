import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'

export interface useAuthStateType {
    email: string
    isAuth: boolean
    userId: number
    isOpenMergePopUp: boolean
    hasBusinessAccount: boolean
    contentForMerge: string
    setUserData: (data: { userId: number, hasBusinessAccount: boolean }) => void
    setEmail: (email: string) => void
    setAuth: (isAuth: boolean) => void
    setPopUpForMerge: (isOpenMergePopUp: boolean, contentForMerge: string) => void
}
export const useAuth = create(immer<useAuthStateType>((set) => ({
    email: '',
    userId: 0,
    isAuth: false,
    hasBusinessAccount: false,
    isOpenMergePopUp: false,
    contentForMerge: '',
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
    setUserData: (data: { userId: number, hasBusinessAccount: boolean }) => {
        set(state => {
            state.userId = data.userId
            state.hasBusinessAccount = data.hasBusinessAccount
        })
    },
    setPopUpForMerge: (isOpenMergePopUp, contentForMerge) => {
        set(state => {
            state.isOpenMergePopUp = isOpenMergePopUp
            state.contentForMerge = contentForMerge
        })
    }
})))
