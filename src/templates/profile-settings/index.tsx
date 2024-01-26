import { useRouter } from 'next/router'
import React, { useState } from 'react'
import { Tab } from 'shared/ui'

import { AccountManagement } from './AccountManagement'
import { DeviceList } from './DeviceList/ui/DeviceList'
import GeneralInformation from './GeneralInformation'
import { MyPayments } from './MyPayments'
import cls from './styles.module.scss'

const PATHS = [
  { component: <GeneralInformation />, name: 'General Information' },
  { component: <DeviceList />, name: 'Devices' },
  { component: <AccountManagement />, name: 'Account Management' },
  { component: <MyPayments />, name: 'My Payments' },
]

export function ProfileSettingsPage() {
  const { query } = useRouter()
  const isSuccess = query.success === 'true'
  const [selectedTab, setSelectedTab] = useState(isSuccess ? PATHS[2] : PATHS[0])

  return (
    <div className={cls.rootContainer}>
      <div className={cls.tabContainer}>
        {PATHS.map((t, index) => (
          <Tab
            isSelected={t === selectedTab}
            key={index}
            onClick={() => {
              setSelectedTab(t)
            }}
            text={t.name}
          />
        ))}
      </div>

      <div className={cls.content}>{selectedTab.component}</div>
    </div>
  )
}
