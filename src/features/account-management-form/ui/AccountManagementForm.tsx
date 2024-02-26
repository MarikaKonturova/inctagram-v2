import { isEmpty } from 'lodash'
import { useRouter } from 'next/router'
import React, { type ChangeEvent, FC, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Paypal, Stripe } from 'shared/assets/icons'
import { type AccountOptionType, type CostOfSubscriptionType } from 'shared/types/subscriptions'
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
  accountOptions: AccountOptionType[]
  hasBusinessAccount: boolean
}

export const AccountManagementForm: FC<PropsType> = ({ accountOptions, hasBusinessAccount }) => {
  const { query, replace, route } = useRouter()
  const [modal, setModal] = useState(initialState)
  const [selected, setSelected] = useState({} as CostOfSubscriptionType)
  const [selectedAcc, setSelectedAcc] = useState({} as AccountOptionType)
  const [isBusinessAccount, setIsBusinessAccount] = useState<boolean>(hasBusinessAccount)
  const { t } = useTranslation(['profile'])

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

    replace(route, undefined, { shallow: true })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query.success, route])

  useEffect(() => {
    if (isEmpty(selected)) {
      setSelected(subscriptionCosts[0])
    }
  }, [selected, subscriptionCosts, t])

  const selectHandler = (option: AccountOptionType) => {
    const isPersonal = option.description === t('personal')
    const isBusiness = option.description === t('business')

    setIsBusinessAccount(hasBusinessAccount ? !isPersonal : isBusiness)
  }

  return (
    <div>
      {isBusinessAccount && (
        <>
          {hasBusinessAccount && (
            <>
              <h4 className={cls.label}>{t('currentSubscription')}</h4>
              <div className={cls.container}>
                <div className={cls.section}>
                  <div>{t('expireAt')}</div>
                  {hasAutoRenewal && <div>{t('nextPayment')}</div>}
                </div>
                <div className={cls.section}>
                  <div>{expireAt}</div>
                  {hasAutoRenewal && <div>{nextPayment}</div>}
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
            </>
          )}
        </>
      )}

      <RadioButtons<AccountOptionType>
        label={`${t('accountType')}`}
        options={accountOptions || []}
        selectHandler={selectHandler}
        selected={selectedAcc}
        selectedValue={isBusinessAccount ? accountOptions[1] : accountOptions[0]}
        setSelected={setSelectedAcc}
      />

      {isBusinessAccount && (
        <>
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
        </>
      )}
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
