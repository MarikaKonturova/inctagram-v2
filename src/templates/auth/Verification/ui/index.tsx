import { ConfirmModal } from 'features/auth'
import { useTranslation } from 'next-i18next'
import React from 'react'
import VerificationImg from 'shared/assets/images/verification.png'
import { Info } from 'shared/ui'

import { useResendEmailMutation } from '../model'

export const EmailVerification = () => {
  const { t } = useTranslation('auth')
  const { verifyEmailHandler } = useResendEmailMutation()

  return (
    <>
      <ConfirmModal />
      <Info
        buttonText={t('verificationButton')}
        image={VerificationImg}
        onClick={verifyEmailHandler}
        text={t('verificationMessage')}
        title={t('verification')}
      />
    </>
  )
}
