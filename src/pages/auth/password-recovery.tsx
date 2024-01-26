import { ConfirmModal, PasswordRecoveryForm } from 'features/auth'
import { getAuthLayout } from 'layouts/AuthLayout/AuthLayout'
import { type GetServerSidePropsContext } from 'next'
import { getTranslations } from 'shared/lib/i18n'

export default function PasswordRecovery() {
  return (
    <>
      <PasswordRecoveryForm />
      <ConfirmModal />
    </>
  )
}

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => ({
  props: await getTranslations(ctx.locale, ['auth']),
})

PasswordRecovery.getLayout = getAuthLayout
