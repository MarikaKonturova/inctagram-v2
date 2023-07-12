import { useMutation } from '@tanstack/react-query'
import { type AxiosError } from 'axios'
import { useState } from 'react'
import { useAuth } from 'features/auth/model'
import { SelectSetEmail } from 'features/auth/model/selectors'
import { AuthService } from 'shared/api/auth/authService'
import { useModal } from 'shared/hooks/useModal'
import { type PasswordRecoveryValidation } from '../ui/PasswordRecoveryForm/PasswordRecoveryForm'

export const useRecoverPassword = () => {
    const [isInfoTextShown, setIsInfoTextShown] = useState(false)
    const setEmail = useAuth(SelectSetEmail)
    const { setIsOpen } = useModal()

    const { mutate: passwordRecovery, isLoading, error } = useMutation<any, AxiosError<{ message: string }>, any>({
        mutationFn: AuthService.passwordRecovery,
        retry: false,
        onSuccess: async () => {
            setIsInfoTextShown(true)
            setIsOpen(true)
        }
    })

    const onSubmit = (data: PasswordRecoveryValidation) => {
        passwordRecovery(data)
        setEmail(data.email)
    }

    return { isInfoTextShown, onSubmit, isLoading, error }
}
