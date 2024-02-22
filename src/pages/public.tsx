import { getPublicLayout } from 'layouts'
import { LastPublicationsResponse } from 'shared/types/home'
import { PublicPage } from 'templates/public'

export interface PublicProps {
  data: LastPublicationsResponse
}

export default function Public({ data }: PublicProps) {
  return <PublicPage data={data} />
}

Public.getLayout = getPublicLayout

export async function getStaticProps() {
  const res = await fetch(`${process.env.API_URL}home/last-publications`, { cache: 'no-store' })
  const data = await res.json()

  if (!res.ok) {
    throw new Error(`Failed to fetch posts, received status ${res.status}`)
  }

  return {
    props: {
      data,
    },
    revalidate: 60,
  }
}
