import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import { type ProfileDataModel } from 'shared/types/auth'
import { type ValidateUnion, createValidationSchema } from './profileFormSchema'

export type GeneralInformationFormValues = ProfileDataModel & { country: string }

export const useValidationForm = (arr: ValidateUnion[], defaultValues?: GeneralInformationFormValues) => {
    const {
        register,
        handleSubmit,
        reset,
        setError,
        control,
        setValue,
        watch,
        formState: { errors, isDirty }
    } = useForm<GeneralInformationFormValues>({
        resolver: yupResolver(createValidationSchema(arr)),
        mode: 'onTouched' || 'onSubmit',
        reValidateMode: 'onChange',
        defaultValues
    })

    const userNameError = errors?.userName && errors.userName.message
    const firstNameError = errors?.firstName && errors.firstName.message
    const lastNameError = errors?.lastName && errors.lastName.message
    const aboutMeError = errors?.aboutMe && errors.aboutMe.message
    const dateOfBirthError = errors?.dateOfBirth && errors.dateOfBirth.message

    const validErrors = {
        userNameError,
        firstNameError,
        lastNameError,
        aboutMeError,
        dateOfBirthError
    }

    return {
        validErrors,
        register,
        handleSubmit,
        reset,
        setError,
        control,
        isDirty,
        setValue,
        watch
    }
}
