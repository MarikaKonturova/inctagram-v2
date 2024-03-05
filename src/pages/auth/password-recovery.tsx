import { ConfirmModal, PasswordRecoveryForm } from 'features/auth'
import { getAuthLayout } from 'layouts'
import { type GetServerSidePropsContext } from 'next'
import { useEffect, useState } from 'react'
import { getTranslations } from 'shared/lib/i18n'

export default function PasswordRecovery() {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) {
    return null
  }

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
