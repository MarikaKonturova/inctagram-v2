import { type FC, type PropsWithChildren, useEffect, useState } from 'react'
import { createPortal } from 'react-dom'

export const Portal: FC<PropsWithChildren> = ({ children }) => {
    const [mounted, setMounted] = useState(false)
    const [container, setContainer] = useState<HTMLElement | null>(null)

    if (typeof window !== 'undefined' && !container) {
        setContainer(document.createElement('section'))
    }

    useEffect(() => {
        setMounted(true)
        if (container) document.body.appendChild(container)
        return () => {
            if (container) document.body.removeChild(container)
            setMounted(false)
        }
    }, [])
    return mounted && container ? createPortal(children, container) : null
}
