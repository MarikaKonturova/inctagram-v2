import { getAuthLayout } from 'layouts/Layout/AuthLayout/AuthLayout'
import { ConfirmModal, LoginForm } from 'features/auth'

export default function Login () {
    return <>
        <LoginForm/>
        <ConfirmModal/>
    </>
}

Login.getLayout = getAuthLayout
