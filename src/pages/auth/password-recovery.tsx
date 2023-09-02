import { getAuthLayout } from 'layouts/Layout/AuthLayout/AuthLayout'
import { type GetServerSidePropsContext } from 'next'
import { PasswordRecoveryForm, ConfirmModal } from 'features/auth'
import { getTranslations } from 'shared/lib/i18n'

export default function PasswordRecovery () {
    return (
        <>
            <PasswordRecoveryForm />
            <ConfirmModal />
        </>
    )
}

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => ({
    props: await getTranslations(ctx.locale, ['auth'])
})

PasswordRecovery.getLayout = getAuthLayout
