import { useRouter } from 'next/router'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Tab } from 'shared/ui'

import { AccountManagement } from './AccountManagement'
import { DeviceList } from './DeviceList/ui/DeviceList'
import GeneralInformation from './GeneralInformation'
import { MyPayments } from './MyPayments'
import cls from './styles.module.scss'

const PATHS = [
  { component: <GeneralInformation />, name: 'generalInfo' },
  { component: <DeviceList />, name: 'devices' },
  { component: <AccountManagement />, name: 'accountManagement' },
  { component: <MyPayments />, name: 'myPayments' },
]

export function ProfileSettingsPage() {
  const { query } = useRouter()
  const isSuccess = query.success === 'true'
  const { t } = useTranslation(['profile'])
  const [selectedTab, setSelectedTab] = useState(isSuccess ? PATHS[2] : PATHS[0])

  console.log('ProfileSettingsPage')

  return (
    <div className={cls.rootContainer}>
      <div className={cls.tabContainer}>
        {PATHS.map((i, index) => (
          <Tab
            isSelected={i === selectedTab}
            key={index}
            onClick={() => {
              setSelectedTab(i)
            }}
            text={t(`${i.name}`)}
          />
        ))}
      </div>

      <div className={cls.content}>{selectedTab.component}</div>
    </div>
  )
}
