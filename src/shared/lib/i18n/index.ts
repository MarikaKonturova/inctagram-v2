import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

export const getTranslations = async (locale: string = '', ns = ['common']) => ({
    ...(await serverSideTranslations(locale, ns))
})
