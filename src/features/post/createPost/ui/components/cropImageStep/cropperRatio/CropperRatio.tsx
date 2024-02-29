import { Menu, Transition } from '@headlessui/react'
import clsx from 'clsx'
import { type FC } from 'react'
import IconExpand from 'shared/assets/icons/general/expand.svg'
import IconRectangle1to1 from 'shared/assets/icons/general/rectangle1to1.svg'
import IconRectangle4to5 from 'shared/assets/icons/general/rectangle4to5.svg'
import IconRectangle16to9 from 'shared/assets/icons/general/rectangle16to9.svg'
import IconImageOutline from 'shared/assets/icons/outline/image-outline.svg'

import cls from './CropperRatio.module.scss'

interface IProps {
  onClick: (value: number | undefined) => void
}

export const CropperRatio: FC<IProps> = ({ onClick }) => {
  return (
    <div className={cls.controls}>
      <Menu>
        <Menu.Button className={cls.icon_button}>
          <IconExpand />
        </Menu.Button>
        <Transition
          enter={cls.transition}
          enterFrom={cls.enterFrom}
          enterTo={cls.enterTo}
          leave={cls.leave}
          leaveFrom={cls.leaveFrom}
          leaveTo={cls.leaveTo}
        >
          <Menu.Items className={cls.menu_items}>
            <Menu.Item>
              {({ active }) => (
                <div
                  className={clsx(cls.menu_item, active && cls.menu_item_active)}
                  onClick={() => {
                    onClick(undefined)
                  }}
                >
                  <span>Оригинал</span>
                  <IconImageOutline fill={'inherit'} stroke={'none'} />
                </div>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <div
                  className={clsx(cls.menu_item, active && cls.menu_item_active)}
                  onClick={() => {
                    onClick(1 / 1)
                  }}
                >
                  <span>1:1</span>
                  <IconRectangle1to1 stroke={'inherit'} />
                </div>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <div
                  className={clsx(cls.menu_item, active && cls.menu_item_active)}
                  onClick={() => {
                    onClick(4 / 5)
                  }}
                >
                  <span>4:5</span>
                  <IconRectangle4to5 stroke={'inherit'} />
                </div>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <div
                  className={clsx(cls.menu_item, active && cls.menu_item_active)}
                  onClick={() => {
                    onClick(16 / 9)
                  }}
                >
                  <span>16:9</span>
                  <IconRectangle16to9 stroke={'inherit'} />
                </div>
              )}
            </Menu.Item>
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  )
}