export const createNewPasswordLink = process.env.NODE_ENV === 'development'
    ? 'http://localhost:3000/en/auth/create-new-password'
    : 'https://inctagram.online/en/auth/create-new-password'
