import { getPublicLayout } from 'layouts'
import { GetServerSidePropsContext } from 'next'
import { useEffect, useState } from 'react'
import { getTranslations } from 'shared/lib/i18n'
import { LastPublicationsResponse } from 'shared/types/home'
import { PublicPage } from 'templates/public'

export interface PublicProps {
  data: LastPublicationsResponse
}

export default function Public({ data }: PublicProps) {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) {
    return null
  }

  return <PublicPage data={data} />
}

export async function getStaticProps(ctx: GetServerSidePropsContext) {
  const res = await fetch(`${process.env.API_URL}home/last-publications`, { cache: 'no-store' })
  const data = await res.json()

  if (!res.ok) {
    throw new Error(`Failed to fetch posts, received status ${res.status}`)
  }

  return {
    props: {
      data,
      ...(await getTranslations(ctx.locale, ['common'])),
    },
    revalidate: 60,
  }
}
Public.getLayout = getPublicLayout
