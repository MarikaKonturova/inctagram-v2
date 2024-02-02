import { useGetProfileData } from 'entities/Profile'
import { GeneralInformationForm } from 'features/general-information-form'
import { AvatarBlock } from 'features/profile/avatar'

import cls from './styles.module.scss'

export default function GeneralInformation() {
  const { response } = useGetProfileData()
  const userData = response?.data

  return (
    <div className={cls.container}>
      <AvatarBlock avatars={userData?.avatars} />
      <GeneralInformationForm userData={userData} />
    </div>
  )
}
