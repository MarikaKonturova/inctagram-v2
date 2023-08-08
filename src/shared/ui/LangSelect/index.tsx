/* eslint-disable @typescript-eslint/no-floating-promises */
import { Listbox } from '@headlessui/react'
import clsx from 'clsx'
import { useRouter } from 'next/router'
import ArrowDown from 'shared/assets/icons/general/arrow-Down.svg'
import ArrowUp from 'shared/assets/icons/general/arrow-Up.svg'
import useLocale from 'shared/hooks/useLocale'
import cls from './styles.module.scss'

const languages: Record<string, string> = {
    en: '🇺🇸 English',
    ru: '🇷🇺 Russian'
}

export const LangSelect = () => {
    const router = useRouter()
    const { locale, changeLocale } = useLocale()

    const changeLangHandler = (locale: string) => {
        changeLocale(locale)
        router.push('/', '', { locale })
    }

    return (
        <Listbox value={locale} onChange={changeLangHandler}>
            {({ open, value }) => (
                <div className={cls.container}>
                    <Listbox.Button className={clsx(cls.button, cls.listItem)}>
                        {languages[locale]}
                        {open
                            ? <ArrowUp className={cls.icon} />
                            : <ArrowDown className={cls.icon} />}
                    </Listbox.Button>
                    <Listbox.Options>
                        {Object.entries(languages).map(([key, label]) => key !== value && (
                            <Listbox.Option
                                key={key}
                                value={key}
                                className={cls.listItem}
                            >
                                {label}
                            </Listbox.Option>
                        ))}
                    </Listbox.Options>
                </div>
            )}
        </Listbox>
    )
}
