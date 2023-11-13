export const AppRoutes = {
    AUTH: {
        LOGIN: '/auth/login',
        REGISTRATION: '/auth/registration',
        NEW_PASSWORD: '/auth/create-new-password',
        FORGOT_PASSWORD: '/auth/forgot-password',
        CONGRATULATIONS: '/auth/congratulations',
        VERIFICATION: '/auth/verification',
        REGISTRATION_CONFIRMATION: '/auth/registration-confirmation',
        PRIVACY_POLICY: '/auth/privacy-policy',
        TERMS_OF_SERVICE: '/auth/terms-of-service'
    },
    PROFILE: {
        MY_PROFILE: '/profile/myprofile',
        SETTINGS: '/profile/settings/edit'
    },
    HOME: '/home',
    CREATE: '/create',
    STATISTICS: '/statistics',
    FAVORITES: '/favorites'
} as const
