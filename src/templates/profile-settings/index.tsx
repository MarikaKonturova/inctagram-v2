import { useRouter } from 'next/router'
import React, { useState } from 'react'
import GeneralInformation from 'templates/profile-settings/GeneralInformation'
import { AccountManagementForm } from 'features/account-management-form'
import { Tab } from 'shared/ui'
import { DeviceList } from './DeviceList/ui/DeviceList'
import { MyPayments } from './MyPayments'
import cls from './styles.module.scss'

const PATHS = [
    { name: 'General Information', component: <GeneralInformation /> },
    { name: 'Devices', component: <DeviceList /> },
    { name: 'Account Management', component: <AccountManagementForm /> },
    { name: 'My Payments', component: <MyPayments /> }]

export function ProfileSettingsPage () {
    const { query } = useRouter()
    const isSuccess = query.success === 'true'
    const [selectedTab, setSelectedTab] = useState(isSuccess ? PATHS[2] : PATHS[0])

    return (
        <div className={cls.rootContainer}>
            <div className={cls.tabContainer}>
                {PATHS.map((t, index) => (
                    <Tab key={index}
                         text={t.name}
                         onClick={() => { setSelectedTab(t) }}
                         isSelected={t === selectedTab}
                    />
                ))}
            </div>

            <div className={cls.content}>
                {selectedTab.component}
            </div>
        </div>
    )
}
