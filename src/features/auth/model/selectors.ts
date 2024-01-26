import { type useAuthStateType } from '.'

const selectEmail = (state: useAuthStateType) => state.email
const selectSetEmail = (state: useAuthStateType) => state.setEmail
const selectUserId = (state: useAuthStateType) => state.userId

const selectIsAuth = (state: useAuthStateType) => state.isAuth
const selectHasBusinessAccount = (state: useAuthStateType) => state.hasBusinessAccount

export { selectEmail, selectHasBusinessAccount, selectIsAuth, selectSetEmail, selectUserId }
