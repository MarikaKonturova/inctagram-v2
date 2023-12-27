import { ConfirmModal, RegisterForm } from 'features/auth'
import { getAuthLayout } from 'layouts/Layout/AuthLayout/AuthLayout'
import { type GetServerSidePropsContext } from 'next'
import { getTranslations } from 'shared/lib/i18n'

export default function Registration() {
  // eslint-disable-next-line react/jsx-key
  return [<RegisterForm />, <ConfirmModal />]
}

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => ({
  props: await getTranslations(ctx.locale, ['auth']),
})

Registration.getLayout = getAuthLayout
