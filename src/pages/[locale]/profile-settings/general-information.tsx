import { getLayoutWithSidebar } from 'layouts/Layout/LayoutWithSidebar/LayoutWithSidebar'
import { GeneralInformationForm } from 'features/general-information-form'
import { useGetProfileData } from 'features/profile/getProfileData/model'

export default function GeneralInformation () {
    const { response } = useGetProfileData()
    const userData = response?.data

    return <GeneralInformationForm userData={userData} />
}

GeneralInformation.getLayout = getLayoutWithSidebar
