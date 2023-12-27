import { useContext } from 'react'
import { LOCAL_STORAGE_THEME_KEY, Theme } from 'shared/constants/theme'
import { ThemeContext } from 'shared/context/ThemeProvider'

interface UseThemeResult {
  theme: Theme
  toggleTheme: () => void
}

export function useTheme(): UseThemeResult {
  const { setTheme, theme } = useContext(ThemeContext)
  const toggleTheme = (): void => {
    const newTheme = theme === Theme.DARK ? Theme.LIGHT : Theme.DARK

    setTheme?.(newTheme)
    localStorage.setItem(LOCAL_STORAGE_THEME_KEY, newTheme)
  }

  return {
    theme,
    toggleTheme,
  }
}
