// eslint-disable-next-line boundaries/element-types
import { type Story } from '@storybook/react'
import 'app/styles/index.scss'

export const StyleDecorator = (story: () => Story): Story => story()
