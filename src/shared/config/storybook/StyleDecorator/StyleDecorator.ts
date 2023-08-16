import 'app/styles/index.scss'
import { type Story } from '@storybook/react'

export const StyleDecorator = (story: () => Story): Story => story()
