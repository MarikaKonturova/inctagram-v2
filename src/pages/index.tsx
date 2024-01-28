import { getLayoutWithoutSidebar } from 'layouts/Layout/LayoutWithoutSideBar/LayoutWithoutSidebar'
import { type GetServerSidePropsContext } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { getTranslations } from 'shared/lib/i18n'

import { useAuth } from '../features/auth'
import { SelectIsAuth } from '../features/auth/model/selectors'
import { AppRoutes } from '../shared/constants/path'

export default function Home() {
  const isAuth = useAuth(SelectIsAuth)
  const { push } = useRouter()

  void (isAuth ? push(AppRoutes.PROFILE.MY_PROFILE) : push(AppRoutes.PUBLIC))

  return (
    <>
      <Head>
        <title>Inctagram</title>
        <meta content={'Inctagram'} name={'description'} />
        <meta content={'width=device-width, initial-scale=1'} name={'viewport'} />
        <link href={'/favicon.ico'} rel={'icon'} />
      </Head>
    </>
  )
}

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => ({
  props: await getTranslations(ctx.locale, ['common', 'auth']),
})

Home.getLayout = getLayoutWithoutSidebar
