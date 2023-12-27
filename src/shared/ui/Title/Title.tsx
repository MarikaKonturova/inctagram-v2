import clsx from 'clsx'
import { type FC } from 'react'

type TitleTag = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'

type Props<T extends TitleTag> = {
  as: T
} & JSX.IntrinsicElements[T]

export const Title: FC<Props<TitleTag>> = ({ as: Tag, className, ...rest }) => {
  return <Tag className={clsx(className)} {...rest} />
}
