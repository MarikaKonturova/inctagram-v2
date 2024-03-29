import { ConfirmModal, LoginForm } from 'features/auth'
import { getAuthLayout } from 'layouts'
import { type GetServerSidePropsContext } from 'next'
import { useEffect, useState } from 'react'
import { getTranslations } from 'shared/lib/i18n'

export default function Login() {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) {
    return null
  }

  return (
    <>
      <LoginForm />
      <ConfirmModal />
    </>
  )
}

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => ({
  props: await getTranslations(ctx.locale, ['auth']),
})

Login.getLayout = getAuthLayout
