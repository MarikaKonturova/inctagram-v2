import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useAuth } from 'features/auth'
import { SelectSetEmail } from 'features/auth/model/selectors'
import { useSnackbar } from 'features/common'
import { AuthService } from 'shared/api'
import { AppRoutes } from 'shared/constants/path'
import { useModal } from 'shared/hooks/useModal'

export const useResendEmailMutation = () => {
    const [emailInLocalStorage, setEmailInLocalStorage] = useState('')
    const setEmail = useAuth(SelectSetEmail)
    const onOpen = useSnackbar((state) => state.onOpen)
    const { setIsOpen } = useModal()
    const { push } = useRouter()

    const { mutate: resendEmail } = useMutation(AuthService.resendEmail, {
        mutationKey: ['resendEmail'],
        onSuccess: () => {
            void push({ pathname: AppRoutes.AUTH.LOGIN })
            setIsOpen(true)
        },
        onError: () => {
            onOpen('Email already confirmed or doesnt exist', 'danger', 'left')
        }
    })

    const verifyEmailHandler = () => {
        if (emailInLocalStorage) {
            setEmail(emailInLocalStorage)
            resendEmail({ email: emailInLocalStorage })
        }
    }

    useEffect(() => {
        setEmailInLocalStorage(localStorage.getItem('email') || '')
    }, [])

    return { verifyEmailHandler }
}
