import router from 'next/router'

export const routerPush = (href: string) => {
    void router.push(href)
}
