import router from 'next/router'
import languageDetector from 'shared/lib/i18n/languageDetector'

export const routerPush = (href: string) => {
    void router.push(`/${languageDetector.detect() || ''}${href}`)
}
