import { InfiniteData, useQueryClient } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import { useInView } from 'react-intersection-observer'
import { MyPostService } from 'shared/api'

type ParamsType = {
  data: InfiniteData<any> | undefined
  fetchNextPage: () => void
  hasNextPage: boolean
  postId: number
}

export const useInfiniteScroll = ({ data, fetchNextPage, hasNextPage, postId }: ParamsType) => {
  const queryClient = useQueryClient()
  const { inView, ref } = useInView({ threshold: 1 })

  const [currentIndex, setCurrentIndex] = useState<number>(0)
  const [currentPost, setCurrentPost] = useState<number>(0)

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const idsArray: number[] =
    data && data.pages
      ? data.pages.flatMap(page => page.items.map((item: { id: number }) => item.id))
      : []

  const foundIndex = idsArray.findIndex(id => id === postId)
  const firstElement = idsArray[0] === idsArray[currentIndex]
  const lastElement = idsArray[idsArray.length - 1] === idsArray[currentIndex]

  useEffect(() => {
    if (idsArray[currentIndex]) {
      setCurrentPost(idsArray[currentIndex])
    } else {
      setCurrentPost(postId)
    }
  }, [postId, idsArray, currentIndex])

  useEffect(() => {
    setCurrentIndex(foundIndex)
  }, [postId])

  useEffect(() => {
    {
      idsArray.map(id => {
        queryClient.prefetchQuery(['post', id], () => MyPostService.getPost(id))
      })
    }
  }, [idsArray])

  useEffect(() => {
    if (inView && hasNextPage) {
      void fetchNextPage()
    }
  }, [inView, hasNextPage, fetchNextPage])

  return {
    currentIndex,
    currentPost,
    firstElement,
    foundIndex,
    idsArray,
    lastElement,
    ref,
    setCurrentIndex,
  }
}
