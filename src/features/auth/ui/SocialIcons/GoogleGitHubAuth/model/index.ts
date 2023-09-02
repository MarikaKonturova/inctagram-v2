import { useQuery } from '@tanstack/react-query'
import { type GoogleAndGitHubAuthProps } from '../ui/GoogleGitHubAuth'

export const GITHUB_AUTHORIZATION = {
    registrationGitHub () {
        window.location.assign('https://twin.cygan.lol/auth/github/registration')
    },
    loginGitHub () {
        window.location.assign('https://twin.cygan.lol/auth/github/authorization')
    }
}
export const GOOGLE_AUTHORIZATION = {
    registrationGoogle () {
        window.location.assign('https://twin.cygan.lol/auth/google/registration')
    },
    loginGoogle () {
        window.location.assign('https://twin.cygan.lol/auth/google/authorization')
    }
}

export const useGoogleGitHubAuth = ({ type, method }: GoogleAndGitHubAuthProps) => {
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
        queryKey: ['gihubAuth'],
        queryFn: authorizationMethod,
        enabled: false
    })

    return { refetch }
}
