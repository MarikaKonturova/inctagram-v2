import { useInfiniteQuery, useQuery } from '@tanstack/react-query'
import { MyPostService } from 'shared/api'
import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'

export const useGetPosts = (userName: string) => {
  const { data, error, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading, isSuccess } =
    useInfiniteQuery(
      ['post', userName],
      ({ pageParam = 1 }) => MyPostService.getPosts(userName, pageParam),
      {
        getNextPageParam: lastPage => {
          return lastPage.page < lastPage.pagesCount ? lastPage.page + 1 : undefined
        },
      }
    )

  return {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isSuccess,
  }
}

export const useGetMyPost = (postId: number) => {
  const { data, error, isLoading } = useQuery(
    ['post', postId],
    () => MyPostService.getPost(postId),
    {
      enabled: !!postId,
    }
  )
  const post = data?.data

  return { post }
}

export interface StateType {
  refetch: {
    doRefetch: boolean
  }
  repliedComment: {
    id: number
    userName: string
  }
  setRefetch: (payload: StateType['refetch']) => void
  setRepliedComment: (payload: StateType['repliedComment']) => void
}

export const useCommentStore = create(
  immer<StateType>(set => ({
    refetch: {
      doRefetch: false,
    },
    repliedComment: {
      id: 0,
      userName: '',
    },
    setRefetch: (payload: StateType['refetch']) => {
      set({ refetch: payload })
    },
    setRepliedComment: (payload: StateType['repliedComment']) => {
      set({ repliedComment: payload })
    },
  }))
)
