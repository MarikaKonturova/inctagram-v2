import { Menu, Transition } from '@headlessui/react'
import clsx from 'clsx'
import { Fragment, ReactNode } from 'react'
import IconThreedots from 'shared/assets/icons/outline/more-horizontal.svg'

import cls from './MoreOptions.module.scss'

interface IProps {
  content: ReactNode
}

export const MoreOptions = ({ content }: IProps) => {
  return (
    <>
      <Menu as={'div'} className={clsx(cls.menu)}>
        <Menu.Button>
          <IconThreedots className={clsx(cls.menu_icon)} />
        </Menu.Button>
        <Transition
          as={Fragment}
          enter={clsx(cls.enter)}
          enterFrom={clsx(cls.enter_from)}
          enterTo={clsx(cls.enter_to)}
          leave={clsx(cls.leave)}
          leaveFrom={clsx(cls.leave_from)}
          leaveTo={clsx(cls.leave_to)}
        >
          <Menu.Items className={clsx(cls.items)}>{content}</Menu.Items>
        </Transition>
      </Menu>
    </>
  )
}
