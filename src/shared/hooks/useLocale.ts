import Cookies from 'js-cookie'

import { useEffect, useState } from 'react'
import i18nextConfig from '../../../next-i18next.config'
const { defaultLocale } = i18nextConfig.i18n

const useLocale = () => {
    const [locale, setLocale] = useState(defaultLocale)

    useEffect(() => {
        const savedLocale = Cookies.get('locale')
        console.log({ savedLocale })
        if (savedLocale) {
            setLocale(savedLocale)
        }
    }, [])

    const changeLocale = (newLocale: string) => {
        Cookies.set('locale', newLocale)
        setLocale(newLocale)
    }

    return { locale, changeLocale }
}

export default useLocale
