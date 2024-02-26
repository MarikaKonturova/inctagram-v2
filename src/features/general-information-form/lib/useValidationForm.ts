import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import { type ProfileDataModel } from 'shared/types/auth'

import { type ValidateUnion, createValidationSchema } from './profileFormSchema'

export type GeneralInformationFormValues = ProfileDataModel & { country: string }

export const useValidationForm = (
  arr: ValidateUnion[],
  defaultValues?: GeneralInformationFormValues
) => {
  const {
    control,
    formState: { errors, isDirty },
    handleSubmit,
    register,
    reset,
    setError,
    setValue,
    watch,
  } = useForm<GeneralInformationFormValues>({
    defaultValues,
    mode: 'onTouched' || 'onSubmit',
    reValidateMode: 'onChange',
    resolver: yupResolver(createValidationSchema(arr)),
  })

  const userNameError = errors?.userName && errors.userName.message
  const firstNameError = errors?.firstName && errors.firstName.message
  const lastNameError = errors?.lastName && errors.lastName.message
  const aboutMeError = errors?.aboutMe && errors.aboutMe.message
  const dateOfBirthError = errors?.dateOfBirth && errors.dateOfBirth.message

  const validErrors = {
    aboutMeError,
    dateOfBirthError,
    firstNameError,
    lastNameError,
    userNameError,
  }

  return {
    control,
    handleSubmit,
    isDirty,
    register,
    reset,
    setError,
    setValue,
    validErrors,
    watch,
  }
}
