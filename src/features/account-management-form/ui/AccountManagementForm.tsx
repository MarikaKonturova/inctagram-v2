import { isEmpty } from 'lodash'
import { useRouter } from 'next/router'
import React, { type ChangeEvent, FC, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Paypal, Stripe } from 'shared/assets/icons'
import { type CostOfSubscriptionType } from 'shared/types/subscriptions'
import { Button, Checkbox, Modal, RadioButtons } from 'shared/ui'

import { useSubscriptions } from '../model'
import cls from './AccountManagementForm.module.scss'

const initialState = {
  buttonLabel: '',
  message: '',
  modalOpen: false,
  title: '',
}

type PropsType = {
  hasBusinessAccount: boolean
}

export const AccountManagementForm: FC<PropsType> = ({ hasBusinessAccount }) => {
  const { query } = useRouter()
  const [modal, setModal] = useState(initialState)
  const [selected, setSelected] = useState({} as CostOfSubscriptionType)
  const { t } = useTranslation(['profile'])

  const ACCOUNT_TYPE_OPTIONS = [
    { description: t('personal'), disabled: hasBusinessAccount },
    { description: t('business'), disabled: !hasBusinessAccount },
  ]

  const {
    cancelAutoRenewal,
    expireAt,
    hasAutoRenewal,
    nextPayment,
    onStripeHandler,
    subscriptionCosts,
  } = useSubscriptions(selected)

  const onCheckboxHandler = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.currentTarget.checked) {
      cancelAutoRenewal()
    }
  }

  const handleClose = () => {
    setModal(initialState)
  }

  useEffect(() => {
    const isSuccess = query.success === 'true'
    const isError = query.success === 'false'

    if (isSuccess) {
      setModal({
        buttonLabel: 'Ok',
        message: `${t('successfulPayment')}`,
        modalOpen: true,
        title: `${t('success')}`,
      })
    }

    if (isError) {
      setModal({
        buttonLabel: `${t('backToPayment')}`,
        message: `${t('failedPayment')}`,
        modalOpen: true,
        title: `${t('error')}`,
      })
    }
  }, [query])

  useEffect(() => {
    if (isEmpty(selected)) {
      setSelected(subscriptionCosts[0])
    }
  }, [selected, subscriptionCosts])

  return (
    <div>
      <h4 className={cls.label}>{t('currentSubscription')}</h4>
      <div className={cls.container}>
        <div className={cls.section}>
          <div>{t('expireAt')}</div>
          <div>{t('nextPayment')}</div>
        </div>
        <div className={cls.section}>
          <div>{expireAt}</div>
          <div>{nextPayment}</div>
        </div>
      </div>
      <div className={cls.checkboxContainer}>
        <Checkbox
          checked={hasAutoRenewal}
          disabled={!hasAutoRenewal}
          onChange={onCheckboxHandler}
        />
        <span>{t('autoRenewal')}</span>
      </div>
      <RadioButtons
        label={`${t('accountType')}`}
        options={ACCOUNT_TYPE_OPTIONS}
        selectedValue={hasBusinessAccount ? ACCOUNT_TYPE_OPTIONS[1] : ACCOUNT_TYPE_OPTIONS[0]}
      />
      <RadioButtons<CostOfSubscriptionType>
        label={`${t('subscriptionCosts')}`}
        options={subscriptionCosts || []}
        selected={selected}
        selectedValue={subscriptionCosts[0]}
        setSelected={setSelected}
      />
      <div className={cls.bottomBlock}>
        <Paypal />
        or
        <Stripe onClick={onStripeHandler} />
      </div>
      {modal.modalOpen && (
        <Modal isOpen={modal.modalOpen} onClose={handleClose} title={modal.title}>
          <div className={cls.modal}>
            {modal.message}
            <Button onClick={handleClose}>{modal.buttonLabel}</Button>
          </div>
        </Modal>
      )}
    </div>
  )
}
