import { type useAuthStateType } from '.'

export const SelectEmail = (state: useAuthStateType) => state.email
export const SelectSetEmail = (state: useAuthStateType) => state.setEmail
export const SelectUserId = (state: useAuthStateType) => state.userId
export const SelectHasBusinessAccount = (state: useAuthStateType) => state.hasBusinessAccount
