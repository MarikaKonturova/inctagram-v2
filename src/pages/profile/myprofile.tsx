import { getProfilePageLayout } from 'layouts'
import { GetServerSidePropsContext } from 'next'
import { getTranslations } from 'shared/lib/i18n'
import { ProfilePage } from 'templates/profile'

export default function Profile() {
  return <ProfilePage />
}

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => ({
  props: await getTranslations(ctx.locale, ['profile']),
})

Profile.getLayout = getProfilePageLayout
