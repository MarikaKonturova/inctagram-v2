import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import { type ProfileInfoType } from 'shared/types/profile'
import { type ValidateUnion, createValidationSchema } from './profileFormSchema'

export const useValidationForm = (arr: ValidateUnion[], defaultValues?: ProfileInfoType) => {
    const {
        register,
        handleSubmit,
        reset,
        control,
        formState: { errors }
    } = useForm<ProfileInfoType>({
        resolver: yupResolver(createValidationSchema(arr)),
        mode: 'onSubmit' || 'onChange',
        reValidateMode: 'onChange',
        defaultValues
    })

    const userNameError = errors?.userName && errors.userName.message
    const nameError = errors?.name && errors.name.message
    const surNameError = errors?.surName && errors.surName.message
    const cityError = errors?.city && errors.city.message
    const aboutMeError = errors?.aboutMe && errors.aboutMe.message

    const validErrors = {
        userNameError,
        nameError,
        surNameError,
        cityError,
        aboutMeError
    }

    return {
        validErrors,
        register,
        handleSubmit,
        reset,
        control
    }
}
