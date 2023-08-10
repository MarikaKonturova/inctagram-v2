import Cookies from 'js-cookie'

import { useTranslation } from 'next-i18next'
import { useEffect, useState } from 'react'
import i18nextConfig from '../../../next-i18next.config'
const { defaultLocale } = i18nextConfig.i18n

const useLocale = () => {
    const [locale, setLocale] = useState(defaultLocale)
    const { i18n } = useTranslation()

    useEffect(() => {
        const savedLocale = Cookies.get('locale')

        if (savedLocale) {
            setLocale(savedLocale)
            void i18n.changeLanguage(savedLocale)
        }
    }, [])

    const changeLocale = (newLocale: string) => {
        Cookies.set('locale', newLocale)
        setLocale(newLocale)
        void i18n.changeLanguage(newLocale)
    }

    return { locale, changeLocale }
}

export default useLocale
