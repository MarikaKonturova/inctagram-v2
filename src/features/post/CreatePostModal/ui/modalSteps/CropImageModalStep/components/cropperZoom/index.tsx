import { Menu, Transition } from '@headlessui/react'
import React, { ChangeEvent, useEffect, useRef, useState } from 'react'
import IconSearch from 'shared/assets/icons/general/search.svg'

import cls from './styles.module.scss'

interface ICropperZoom {
  max: number
  min: number
  onChange: (value: number) => void
  step: number
  value: number
}

export const CropperZoom = ({ max, min, onChange, step, value }: ICropperZoom) => {
  const [inputValue, setInputValue] = useState(value)
  const handleSliderInput = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.currentTarget.value

    setInputValue(+value)
    onChange(+value)
  }

  return (
    <div className={cls.controls}>
      <Menu>
        <Menu.Button className={cls.icon_button}>
          <IconSearch />
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
              <div className={cls.range_slider}>
                <input
                  className={cls.slider}
                  max={max}
                  min={min}
                  onChange={handleSliderInput}
                  step={step}
                  type={'range'}
                  value={inputValue}
                />
              </div>
            </Menu.Item>{' '}
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  )
}
