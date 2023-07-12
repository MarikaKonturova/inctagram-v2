import React from 'react'
import { useTranslation } from 'react-i18next'
import { ConfirmModal } from 'features/auth'
import VerificationImg from 'shared/assets/images/verification.png'
import { Info } from 'shared/ui'
import { useResendEmailMutation } from '../model'

export const EmailVerification = () => {
    const { t } = useTranslation()
    const { verifyEmailHandler } = useResendEmailMutation()

    return (
        <>
            <ConfirmModal/>
            <Info title={t('verification-title')} // Срок действия ссылки для подтверждения электронной почты истек!
                  text={t('verification-text')} // Срок действия ссылки для подтверждения истек. Не волнуйтесь, мы можем отправить ссылку еще раз
                  buttonText={t('verification-button')} // Повторно отправить ссылку для подтверждения
                  image={VerificationImg}
                  onClick={verifyEmailHandler}
            />
        </>
    )
}
