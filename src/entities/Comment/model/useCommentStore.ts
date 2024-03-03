import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import { immer } from 'zustand/middleware/immer'

export interface StateType {
  refetch: {
    doRefetch: boolean
  }
  repliedComment: {
    id: number
    postId: number | undefined
    userName: string | undefined
  }
  setRefetch: (payload: StateType['refetch']) => void
  setRepliedComment: (payload: StateType['repliedComment']) => void
}

export const useCommentStore = create(
  devtools(
    immer<StateType>(set => ({
      refetch: {
        doRefetch: false,
      },
      repliedComment: {
        id: 0,
        postId: 0,
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
)
