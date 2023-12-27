import { useQuery } from '@tanstack/react-query'

import { type GoogleAndGitHubAuthProps } from '../ui/GoogleGitHubAuth'

export const GITHUB_AUTHORIZATION = {
  loginGitHub() {
    window.location.assign('https://twin.cygan.lol/auth/github/authorization')
  },
  registrationGitHub() {
    window.location.assign('https://twin.cygan.lol/auth/github/registration')
  },
}
export const GOOGLE_AUTHORIZATION = {
  loginGoogle() {
    window.location.assign('https://twin.cygan.lol/auth/google/authorization')
  },
  registrationGoogle() {
    window.location.assign('https://twin.cygan.lol/auth/google/registration')
  },
}

export const useGoogleGitHubAuth = ({ method, type }: GoogleAndGitHubAuthProps) => {
  let authorizationMethod

  switch (type) {
    case 'Registration':
      switch (method) {
        case 'Google':
          authorizationMethod = GOOGLE_AUTHORIZATION.registrationGoogle
          break
        case 'GitHub':
          authorizationMethod = GITHUB_AUTHORIZATION.registrationGitHub
          break
        default:
          break
      }
      break
    case 'Login':
      switch (method) {
        case 'Google':
          authorizationMethod = GOOGLE_AUTHORIZATION.loginGoogle
          break
        case 'GitHub':
          authorizationMethod = GITHUB_AUTHORIZATION.loginGitHub
          break
        default:
          break
      }
      break
    default:
      break
  }

  const { refetch } = useQuery({
    enabled: false,
    queryFn: authorizationMethod,
    queryKey: ['gihubAuth'],
  })

  return { refetch }
}
