import { getPublicLayout } from 'layouts/Layout/PublicLayout/PublicLayout'
import { PublicPage } from 'templates/public'

export default function Public() {
  return <PublicPage />
}

Public.getLayout = getPublicLayout
