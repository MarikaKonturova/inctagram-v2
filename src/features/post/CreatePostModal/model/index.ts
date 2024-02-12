import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Coordinates } from 'react-advanced-cropper'
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
interface IImage {
  coordinates?: Coordinates
  filter?: string
  name: string
  src: File
}
export interface StateType {
  image: Nullable<IImage>
  images: IImage[]
  name: string
  setImage: (payload: { index: number; src: File }) => void
  setImages: (payload: Omit<IImage, 'name'>) => void
  setName: (payload: StateType['name']) => void
  setReset: () => void
}

export const useUploadImagePostStore = create(
  immer<StateType>((set, state) => ({
    /* TO DELETE */
    image: null,
    images: [],
    /* TO DELETE */
    name: '',
    /* TO DELETE */
    setImage: (payload: { index: number; src: File }) => {
      set(state => ({
        ...state,
        images: state.images.map((img, index) =>
          index === payload.index ? { ...img, src: payload.src } : img
        ),
      }))
    },
    setImages: ({ coordinates, filter, src }: Omit<IImage, 'name'>) => {
      const name = src.name

      set(state => ({
        ...state,
        images: [
          ...state.images,
          {
            coordinates: coordinates ?? null,
            filter: filter ?? '',
            name,
            src,
          },
        ],
      }))
    },
    /* TO DELETE */
    setName: (payload: StateType['name']) => {
      set({ name: payload })
    },
    setReset: () => {
      set({ image: null, images: [], name: '' })
    },
  }))
)
