import { getLayoutWithSidebar } from 'layouts/Layout/LayoutWithSidebar/LayoutWithSidebar'
import { type GetServerSidePropsContext } from 'next'
import { GeneralInformationForm } from 'features/general-information-form'
import { useGetProfileData } from 'features/profile/getProfileData/model'
import { getTranslations } from 'shared/lib/i18n'

export default function GeneralInformation () {
    const { response } = useGetProfileData()
    const userData = response?.data

    return <GeneralInformationForm userData={userData} />
}

export const getServerSideProps = (ctx: GetServerSidePropsContext) => ({
    props: getTranslations(ctx.locale, ['common'])
})

GeneralInformation.getLayout = getLayoutWithSidebar
