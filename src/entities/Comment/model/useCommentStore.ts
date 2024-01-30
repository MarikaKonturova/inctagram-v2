import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'

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
