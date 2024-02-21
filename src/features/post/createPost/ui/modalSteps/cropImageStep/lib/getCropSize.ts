import { Nullable } from 'features/post/createPost/model'
import { MutableRefObject } from 'react'

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
