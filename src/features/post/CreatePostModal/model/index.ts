import { useMutation, useQueryClient } from '@tanstack/react-query'
import { MyPostService } from 'shared/api'
import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'

interface Args {
  onSuccess: () => void
}

export const useCreateMutation = ({ onSuccess }: Args) => {
  const queryClient = useQueryClient()

  const { isSuccess, mutate } = useMutation({
    mutationFn: MyPostService.createNewPost,
    onSuccess: async () => {
      await queryClient.invalidateQueries(['post'])
      onSuccess()
    },
    retry: false,
  })
  const onCreate = mutate

  return { isSuccess, onCreate }
}

type Nullable<T> = T | null

export interface StateType {
  image: Nullable<File>
  initialImage: Nullable<File>
  name: string
  setImage: (payload: StateType['image']) => void
  setInitialImage: (payload: StateType['initialImage']) => void
  setName: (payload: StateType['name']) => void
  setReset: () => void
}

export const useUploadImagePostStore = create(
  immer<StateType>(set => ({
    image: null,
    initialImage: null,
    name: '',
    setImage: (payload: StateType['image']) => {
      set({ image: payload })
    },
    setInitialImage: (payload: StateType['initialImage']) => {
      set({ initialImage: payload })
    },
    setName: (payload: StateType['name']) => {
      set({ name: payload })
    },
    setReset: () => {
      set({ image: null, initialImage: null, name: '' })
    },
  }))
)
