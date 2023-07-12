import { getAuthLayout } from 'layouts/Layout/AuthLayout/AuthLayout'
import { RegisterForm } from 'features/auth'

export default function Registration () {
    return <RegisterForm/>
}

Registration.getLayout = getAuthLayout
