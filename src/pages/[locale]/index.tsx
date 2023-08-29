import { getLayoutWithSidebar } from 'layouts/Layout/LayoutWithSidebar/LayoutWithSidebar'
import { AppRoutes } from 'shared/config/routeConfig/path'
import { useAuth } from '../../features/auth'
import { routerPush } from '../../shared/lib/routerPush/routerPush'

export default function Home () {
    const { isAuth } = useAuth()

    isAuth && routerPush(AppRoutes.PROFILE.MY_PROFILE)

    return (
        <>
        </>
    )
}

Home.getLayout = getLayoutWithSidebar
