export const AppRoutes = {
  AUTH: {
    CONGRATULATIONS: '/auth/congratulations',
    FORGOT_PASSWORD: '/auth/forgot-password',
    LOGIN: '/auth/login',
    NEW_PASSWORD: '/auth/create-new-password',
    PRIVACY_POLICY: '/auth/privacy-policy',
    REGISTRATION: '/auth/registration',
    REGISTRATION_CONFIRMATION: '/auth/registration-confirmation',
    TERMS_OF_SERVICE: '/auth/terms-of-service',
    VERIFICATION: '/auth/verification',
  },
  CREATE: '/create',
  FAVORITES: '/favorites',
  HOME: '/home',
  PROFILE: {
    MY_PROFILE: '/profile/myprofile',
    PROFILE: '/profile',
    SETTINGS: '/profile/settings/edit',
  },
  STATISTICS: '/statistics',
} as const
