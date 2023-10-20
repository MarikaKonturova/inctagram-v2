import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import { type ProfileDataModel } from 'shared/types/auth'
import { type ValidateUnion, createValidationSchema } from './profileFormSchema'

export const useValidationForm = (arr: ValidateUnion[], defaultValues?: ProfileDataModel) => {
    const {
        register,
        handleSubmit,
        reset,
        control,
        formState: { errors }
    } = useForm<ProfileDataModel>({
        resolver: yupResolver(createValidationSchema(arr)),
        mode: 'onTouched' || 'onSubmit',
        reValidateMode: 'onChange',
        defaultValues
    })

    const userNameError = errors?.userName && errors.userName.message
    const firstNameError = errors?.firstName && errors.firstName.message
    const lastNameError = errors?.lastName && errors.lastName.message
    const cityError = errors?.city && errors.city.message
    const aboutMeError = errors?.aboutMe && errors.aboutMe.message

    const validErrors = {
        userNameError,
        firstNameError,
        lastNameError,
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
