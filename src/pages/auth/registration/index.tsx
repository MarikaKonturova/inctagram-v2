import { ConfirmModal, RegisterForm } from 'features/auth'
import { getAuthLayout } from 'layouts'
import { type GetServerSidePropsContext } from 'next'
import { useEffect, useState } from 'react'
import { getTranslations } from 'shared/lib/i18n'

export default function Registration() {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) {
    return null
  }

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
