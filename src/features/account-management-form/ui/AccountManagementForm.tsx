import { useAuth } from 'features/auth'
import { SelectHasBusinessAccount } from 'features/auth/model/selectors'
import { isEmpty } from 'lodash'
import { useRouter } from 'next/router'
import React, { type ChangeEvent, useEffect, useState } from 'react'
import Paypal from 'shared/assets/icons/general/paypal.svg'
import Stripe from 'shared/assets/icons/general/stripe.svg'
import { type CostOfSubscriptionType } from 'shared/types/subscriptions'
import { Button, Checkbox, Modal, RadioButtons } from 'shared/ui'

import { useSubscriptions } from '../model'
import cls from './styles.module.scss'

const initialState = {
  buttonLabel: '',
  message: '',
  modalOpen: false,
  title: '',
}

export const AccountManagementForm = () => {
  const hasBusinessAccount = useAuth(SelectHasBusinessAccount)
  const { query } = useRouter()
  const [modal, setModal] = useState(initialState)
  const [selected, setSelected] = useState({} as CostOfSubscriptionType)

  const ACCOUNT_TYPE_OPTIONS = [
    { description: 'Personal', disabled: hasBusinessAccount },
    { description: 'Business', disabled: !hasBusinessAccount },
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
        message: 'Payment was successful!',
        modalOpen: true,
        title: 'Success',
      })
    }

    if (isError) {
      setModal({
        buttonLabel: 'Back to payment',
        message: 'Transaction failed, please try again',
        modalOpen: true,
        title: 'Error',
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
      <h4 className={cls.label}>Current Subscription:</h4>
      <div className={cls.container}>
        <div className={cls.section}>
          <div>Expire at</div>
          <div>Next payment</div>
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
        <span>Auto-Renewal</span>
      </div>
      <RadioButtons
        label={'Account type:'}
        options={ACCOUNT_TYPE_OPTIONS}
        selectedValue={hasBusinessAccount ? ACCOUNT_TYPE_OPTIONS[1] : ACCOUNT_TYPE_OPTIONS[0]}
      />
      <RadioButtons<CostOfSubscriptionType>
        label={'Your subscription costs:'}
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
