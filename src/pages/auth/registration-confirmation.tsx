'use client'
import { getAuthLayout } from 'layouts'
import { type NextPageContext } from 'next'
import { EmailConfirmation } from 'templates/auth'

interface IProps {
  queryParams: NextPageContext['query']
}

export default function ConfirmEmail({ queryParams }: IProps) {
  return <EmailConfirmation queryParams={queryParams} />
}

ConfirmEmail.getInitialProps = async (ctx: NextPageContext) => {
  return { queryParams: ctx.query }
}

ConfirmEmail.getLayout = getAuthLayout
