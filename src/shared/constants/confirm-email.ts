export const confirmEmailLink = process.env.NODE_ENV === 'development'
    ? 'http://localhost:3000/en/auth/confirm-email'
    : 'https://inctagram.online/en/auth/confirm-email'
