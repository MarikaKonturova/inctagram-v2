import i18n from 'i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import { initReactI18next } from 'react-i18next'
const ns = ['common']
const supportedLngs = ['en', 'ru']
const resources = ns.reduce((acc, n) => {
    supportedLngs.forEach((lng) => {
        if (!acc[lng]) acc[lng] = {}
        acc[lng] = {
            ...acc[lng],
            [n]: require(`../../../../../public/locales/${lng}/${n}.json`)
        }
    })
    return acc
}, {})
i18n
    .use(LanguageDetector) // detect user language
    .use(initReactI18next)
    .init({
        lng: 'en',
        fallbackLng: 'en',
        defaultNS: 'common',
        ns,
        interpolation: { escapeValue: false },
        react: { useSuspense: false },
        supportedLngs,
        resources
    })

export default i18n
