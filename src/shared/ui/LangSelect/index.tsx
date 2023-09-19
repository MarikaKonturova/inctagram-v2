import { Listbox } from '@headlessui/react'
import clsx from 'clsx'
import { useRouter } from 'next/router'
import RuIcon from 'shared/assets/icons/flags/russia-flag-icon.svg'
import ENIcon from 'shared/assets/icons/flags/united-states-flag-icon.svg'
import ArrowDown from 'shared/assets/icons/general/arrow-Down.svg'
import ArrowUp from 'shared/assets/icons/general/arrow-Up.svg'
import useLocale from 'shared/hooks/useLocale'
import cls from './styles.module.scss'

const languages: Record<string, JSX.Element> = {
    en: <><ENIcon className={cls.flagIcon} /> English</>,
    ru: <><RuIcon className={cls.flagIcon} /> Russian</>
}

export const LangSelect = () => {
    const { pathname, push } = useRouter()
    const { locale, changeLocale } = useLocale()

    const changeLangHandler = (locale: string) => {
        changeLocale(locale)
        void push({ pathname })
    }

    return (
        <Listbox value={locale} onChange={changeLangHandler}>
            {({ open, value }) => (
                <div className={clsx(cls.container, { [cls.helper]: open })}>
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
