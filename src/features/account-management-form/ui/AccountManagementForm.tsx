
import { isEmpty } from 'lodash'
import { useRouter } from 'next/router'
import React, { type ChangeEvent, useEffect, useState } from 'react'
import { useAuth } from 'features/auth'
import { SelectHasBusinessAccount } from 'features/auth/model/selectors'

import Paypal from 'shared/assets/icons/general/paypal.svg'
import Stripe from 'shared/assets/icons/general/stripe.svg'
import { type CostOfSubscriptionType } from 'shared/types/subscriptions'
import { Button, Modal, RadioButtons } from 'shared/ui'
import { useSubscriptions } from '../model'
import cls from './styles.module.scss'

const initialState = {
    modalOpen: false,
    title: '',
    message: '',
    buttonLabel: ''
}

export const AccountManagementForm = () => {
    const hasBusinessAccount = useAuth(SelectHasBusinessAccount)
    const { query } = useRouter()
    const [modal, setModal] = useState(initialState)
    const [selected, setSelected] = useState({} as CostOfSubscriptionType)

    const ACCOUNT_TYPE_OPTIONS = [
        { description: 'Personal', disabled: hasBusinessAccount },
        { description: 'Business', disabled: !hasBusinessAccount }
    ]

    const {
        expireAt,
        nextPayment,
        cancelAutoRenewal,
        onStripeHandler,
        subscriptionCosts,
        hasAutoRenewal
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
                modalOpen: true,
                title: 'Success',
                message: 'Payment was successful!',
                buttonLabel: 'Ok'
            })
        }

        if (isError) {
            setModal({
                modalOpen: true,
                title: 'Error',
                message: 'Transaction failed, please try again',
                buttonLabel: 'Back to payment'
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
                <input type="checkbox"
                       className={cls.checkbox}
                       disabled={!hasAutoRenewal}
                       checked={hasAutoRenewal}
                       onChange={onCheckboxHandler} />
                <span>Auto-Renewal</span>
            </div>
            <RadioButtons
            label="Account type:"
            options={ACCOUNT_TYPE_OPTIONS}
            selectedValue={hasBusinessAccount
                ? ACCOUNT_TYPE_OPTIONS[1]
                : ACCOUNT_TYPE_OPTIONS[0]} />
            <RadioButtons<CostOfSubscriptionType> label="Your subscription costs:"
                                                  selectedValue={subscriptionCosts[0]}
                                                  selected={selected}
                                                  setSelected={setSelected}
                                                  options={subscriptionCosts || []}
            />
            <div className={cls.bottomBlock}>
                <Paypal />
                or
                <Stripe onClick={onStripeHandler} />
            </div>
            {
                modal.modalOpen &&
                <Modal isOpen={modal.modalOpen} title={modal.title} onClose={handleClose}>
                    <div className={cls.modal}>
                        {modal.message}
                        <Button onClick={handleClose}>{modal.buttonLabel}</Button>
                    </div>
                </Modal>
            }
        </div>
    )
}
