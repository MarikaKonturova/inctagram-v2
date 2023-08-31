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
    const { refetch } = useQuery({
        queryKey: ['gihubAuth'],
        queryFn: type === 'Registration' && method === 'Google'
            ? GOOGLE_AUTHORIZATION.registrationGoogle
            : type === 'Login' && method === 'Google'
                ? GOOGLE_AUTHORIZATION.loginGoogle
                : type === 'Registration' && method === 'GitHub'
                    ? GITHUB_AUTHORIZATION.registrationGitHub
                    : GITHUB_AUTHORIZATION.loginGitHub,
        enabled: false
    })

    return { refetch }
}
