import React, { type FC, useEffect, useMemo, useState, createContext } from 'react'
import { LOCAL_STORAGE_THEME_KEY, Theme } from 'shared/constants/theme'

let defaultTheme: Theme

interface ThemeProviderProps {
    initialTheme?: Theme
    children: React.ReactNode
}

export interface ThemeContextProps {
    theme: Theme
    setTheme: (theme: Theme) => void
}

export const ThemeContext = createContext<ThemeContextProps>({ theme: Theme.DARK, setTheme: () => {} })

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
