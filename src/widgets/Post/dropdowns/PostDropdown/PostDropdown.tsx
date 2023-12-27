import { Menu, Transition } from '@headlessui/react'
import clsx from 'clsx'
import { CopyToClipboard, Report, SubscribeOrUnsubscribeButton } from 'features/post'
import { Fragment } from 'react'
import IconThreedots from 'shared/assets/icons/outline/more-horizontal.svg'

import cls from './PostDropdown.module.scss'

interface PostDropdownProps {
  postId: string
  userId: string
}

export const PostDropdown = ({ postId, userId, ...restProps }: PostDropdownProps) => (
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
        <Menu.Items className={clsx(cls.items)}>
          <SubscribeOrUnsubscribeButton userId={userId} />
          <Report />
          <CopyToClipboard />
        </Menu.Items>
      </Transition>
    </Menu>
  </>
)
