import i18n from 'i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import { initReactI18next } from 'react-i18next'
const ns = ['common', 'auth', 'privacy-policy', 'terms-of-use', 'profile', 'post', 'validation']

const supportedLngs = ['en', 'ru']
const resources = ns.reduce((acc, n) => {
  supportedLngs.forEach(lng => {
    if (!acc[lng]) {
      acc[lng] = {}
    }
    acc[lng] = {
      ...acc[lng],
      [n]: require(`./public/locales/${lng}/${n}.json`),
    }
  })

  return acc
}, {})

i18n
  .use(LanguageDetector) // detect user language
  .use(initReactI18next)
  .init({
    debug: true,
    defaultNS: 'common',
    fallbackLng: 'en',
    interpolation: { escapeValue: false },
    lng: 'en',
    ns,
    react: { useSuspense: false },
    resources,
    supportedLngs,
  })

export default i18n
