import { MutableRefObject } from 'react'
import { Nullable } from 'shared/types/post'

export const getCropSize = (containerRef: MutableRefObject<Nullable<HTMLDivElement>>) => {
  if (containerRef && containerRef.current) {
    const width = containerRef.current?.clientWidth
    const height = containerRef.current?.clientHeight

    return {
      height,
      width,
    }
  }

  return undefined
}
