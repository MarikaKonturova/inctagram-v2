import { useRouter } from 'next/router'
import { useEffect } from 'react'
import languageDetector from './languageDetector'

export const useRedirect = (to?: string) => {
    const router = useRouter()
    to = to || router.asPath

    // language detection
    useEffect(() => {
        const detectedLng = languageDetector.detect()
        if (detectedLng && to) {
            if (to?.startsWith(`/${detectedLng}`) && router.route === '/404') { // prevent endless loop
                void router.replace(`/${detectedLng}${router.route}`)
                return
            }
            languageDetector.cache?.(detectedLng)
            void router.replace(`/${detectedLng}${to}`)
        }
    })

    return <></>
}

export const Redirect = () => {
    useRedirect()
    return <></>
}

export const getRedirect = (to?: string) => () => {
    useRedirect(to)
    return <></>
}
