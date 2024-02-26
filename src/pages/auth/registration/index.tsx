import { ConfirmModal, RegisterForm } from 'features/auth'
import { getAuthLayout } from 'layouts'
import { type GetServerSidePropsContext } from 'next'
import { getTranslations } from 'shared/lib/i18n'

export default function Registration() {
  return (
    <>
      <RegisterForm />
      <ConfirmModal />
    </>
  )
}

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => ({
  props: await getTranslations(ctx.locale, ['auth']),
})

Registration.getLayout = getAuthLayout
