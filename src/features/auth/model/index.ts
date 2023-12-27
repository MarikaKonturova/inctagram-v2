import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'

export interface useAuthStateType {
  contentForMerge: string
  email: string
  hasBusinessAccount: boolean
  isAuth: boolean
  isOpenMergePopUp: boolean
  setAuth: (isAuth: boolean) => void
  setEmail: (email: string) => void
  setPopUpForMerge: (isOpenMergePopUp: boolean, contentForMerge: string) => void
  setUserData: (data: { hasBusinessAccount: boolean; userId: number }) => void
  userId: number
}
export const useAuth = create<useAuthStateType>(set => ({
  contentForMerge: '',
  email: '',
  hasBusinessAccount: false,
  isAuth: false,
  isOpenMergePopUp: false,
  setAuth: (isAuth: boolean) => {
    set(state => ({
      ...state,
      isAuth,
    }))
  },
  setEmail: (email: string) => {
    set(state => ({
      ...state,
      email,
    }))
  },
  setPopUpForMerge: (isOpenMergePopUp, contentForMerge) => {
    set(state => ({
      ...state,
      contentForMerge,
      isOpenMergePopUp,
    }))
  },
  setUserData: (data: { hasBusinessAccount: boolean; userId: number }) => {
    set(state => ({
      ...state,
      hasBusinessAccount: data.hasBusinessAccount,
      userId: data.userId,
    }))
  },
  userId: 0,
}))
