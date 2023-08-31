export const AppRoutes = {
    AUTH: {
        LOGIN: '/auth/login',
        REGISTRATION: '/auth/registration',
        NEW_PASSWORD: '/auth/create-new-password',
        FORGOT_PASSWORD: '/auth/forgot-password',
        CONGRATULATIONS: '/auth/congratulations',
        VERIFICATION: '/auth/verification',
        REGISTRATION_CONFIRMATION: '/auth/registration-confirmation'
    },
    PROFILE: {
        MY_PROFILE: '/profile/myprofile'
    },
    PROFILE_SETTINGS: {
        GENERAL_INFORMATION: '/profile-settings/general-information'
    },
    HOME: '/home',
    CREATE: '/create',
    STATISTICS: '/statistics',
    FAVORITES: '/favorites'
} as const
