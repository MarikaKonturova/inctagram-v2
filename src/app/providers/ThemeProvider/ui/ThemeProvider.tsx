import React, { type FC, useEffect, useMemo, useState } from 'react'
import { LOCAL_STORAGE_THEME_KEY, Theme, ThemeContext } from '../lib/ThemeContext'

let defaultTheme: Theme

interface ThemeProviderProps {
    initialTheme?: Theme
    children: React.ReactNode
}

const ThemeProvider: FC<ThemeProviderProps> = ({ children, initialTheme }) => {
    const [theme, setTheme] = useState<Theme>(initialTheme || defaultTheme)
    if (typeof window !== 'undefined') {
        document.body.className = theme
    }
    useEffect(() => {
        if (!initialTheme) {
            setTheme(localStorage?.getItem(LOCAL_STORAGE_THEME_KEY) as Theme || Theme.DARK)
        }
    }, [])

    const defaultProps = useMemo(() => ({
        theme,
        setTheme
    }), [theme])

    return (
        <ThemeContext.Provider value={defaultProps}>
            {children}
        </ThemeContext.Provider>
    )
}

export default ThemeProvider
