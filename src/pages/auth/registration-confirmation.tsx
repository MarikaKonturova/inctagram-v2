'use client'
import { getAuthLayout } from 'layouts/Layout/AuthLayout/AuthLayout'
import { type NextPageContext } from 'next'
import { EmailConfirmation } from 'templates/auth'

interface IProps {
    myQuery: NextPageContext['query']
}

export default function ConfirmEmail ({ myQuery }: IProps) {
    const { code } = myQuery

    return <EmailConfirmation code={code?.toString() || ''} />
}

ConfirmEmail.getInitialProps = async (ctx: NextPageContext) => {
    return { myQuery: ctx.query }
}

ConfirmEmail.getLayout = getAuthLayout
