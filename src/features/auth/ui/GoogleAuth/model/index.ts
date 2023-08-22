import { useQuery } from '@tanstack/react-query'

interface useGoogleAuthProps {
    type: 'Registration' | 'Login'
}

export const GOOGLE_AUTHORIZATION = {
    registrationGoogle () {
        window.location.assign('https://twin.cygan.lol/auth/google/registration')
    },
    loginGoogle () {
        window.location.assign('https://twin.cygan.lol/auth/google/authorization')
    }
}

export const useGoogleAuth = ({ type }: useGoogleAuthProps) => {
    const { refetch } = useQuery({
        queryKey: ['googleAuth'],
        queryFn: type === 'Registration' ? GOOGLE_AUTHORIZATION.registrationGoogle : GOOGLE_AUTHORIZATION.loginGoogle,
        enabled: false
    })

    return { refetch }
}
