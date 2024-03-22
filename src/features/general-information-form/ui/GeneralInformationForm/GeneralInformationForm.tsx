import { useTranslation } from 'next-i18next'
import { type FC, useEffect } from 'react'
import { BUTTON_VARIANTS } from 'shared/constants'
import { type ProfileDataModel } from 'shared/types/auth'
import { Button } from 'shared/ui'
import { getInitialValues } from 'shared/utils/getInitialValues'

import { Form } from '../..'
import { useValidationForm } from '../../lib'
import { useUpdateProfileData } from '../../model'
import cls from './GeneralInformationForm.module.scss'

interface IProps {
  userData?: ProfileDataModel
}

export const GeneralInformationForm: FC<IProps> = ({ userData }) => {
  const defaultValues = getInitialValues(userData)

  const {
    control,
    handleSubmit,
    isDirty,
    register,
    reset,
    setError,
    setValue,
    validErrors,
    watch,
  } = useValidationForm(
    ['userName', 'firstName', 'lastName', 'aboutMe', 'dateOfBirth'],
    defaultValues
  )
  const { mutate } = useUpdateProfileData(setError)
  const { t } = useTranslation(['common'])
  const onSubmit = (data: Omit<ProfileDataModel, 'avatars' | 'id'> & { country: string }) => {
    mutate(data)
  }

  useEffect(() => {
    reset(getInitialValues(userData))
  }, [userData, reset])

  return (
    <form className={cls.formContainer} onSubmit={handleSubmit(onSubmit)}>
      <div className={cls.infoContainer}>
        <Form
          control={control}
          register={register}
          setValue={setValue}
          validErrors={validErrors}
          watch={watch}
        />
      </div>
      <hr className={cls.line} />
      <Button
        className={cls.button}
        disabled={!isDirty}
        theme={BUTTON_VARIANTS.PRIMARY}
        type={'submit'}
      >
        {t('saveChanges')}
      </Button>
    </form>
  )
}
