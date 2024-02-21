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

export type Nullable<T> = T | null

export type ConvertedImage = {
  src: string
}

export type ImageCropperData = {
  aspect: number | undefined
  crop: { x: number; y: number }
  originalAspect: number
  zoom: number
}

export type PostImages<T> = {
  [key: string]: T
}

export interface IImage {
  croppedSrc: string
  cropperData: ImageCropperData
  dimensions: {
    height: number
    width: number
  }
  filter: string
  originSrc: string
}
export interface StateType {
  convertedImages: PostImages<ConvertedImage>
  images: PostImages<IImage>
  imagesIds: string[]
  setAspect: (payload: { aspect: number | undefined; imageId: string }) => void
  setConvertedImages: ({ src }: StateType['convertedImages']) => void
  setCroppedImage: (payload: { croppedSrc: string; imageId: string }) => void
  setFilter: (payload: { filter: string; imageId: string }) => void
  setImages: (payload: StateType['images']) => void
  setReset: () => void
  setZoom: (payload: { imageId: string; zoom: number }) => void
}

export const useUploadImagePostStore = create(
  immer<StateType>(set => ({
    convertedImages: {},
    images: {},
    imagesIds: [],

    setAspect: ({ aspect, imageId }: { aspect: number | undefined; imageId: string }) => {
      set(state => ({
        ...state,
        images: {
          ...state.images,
          [imageId]: {
            ...state.images[imageId],
            cropperData: {
              ...state.images[imageId].cropperData,
              aspect: aspect ?? state.images[imageId].cropperData.originalAspect,
            },
          },
        },
      }))
    },

    setConvertedImages: (payload: StateType['convertedImages']) => {
      set(state => ({
        ...state,
        convertedImages: { ...state.convertedImages, ...payload },
      }))
    },
    setCroppedImage: ({ croppedSrc, imageId }: { croppedSrc: string; imageId: string }) => {
      set(state => ({
        ...state,
        images: { ...state.images, [imageId]: { ...state.images[imageId], croppedSrc } },
      }))
    },
    setFilter: ({ filter, imageId }: { filter: string; imageId: string }) => {
      set(state => ({
        ...state,
        images: { ...state.images, [imageId]: { ...state.images[imageId], filter } },
      }))
    },
    setImages: (payload: StateType['images']) => {
      set(state => ({
        ...state,
        images: { ...state.images, ...payload },
        imagesIds: [...Object.keys(payload)],
      }))
    },
    setReset: () => {
      set({ convertedImages: {}, images: {}, imagesIds: [] })
    },
    setZoom: ({ imageId, zoom }: { imageId: string; zoom: number }) => {
      set(state => ({
        ...state,
        images: {
          ...state.images,
          [imageId]: {
            ...state.images[imageId],
            cropperData: { ...state.images[imageId].cropperData, zoom },
          },
        },
      }))
    },
  }))
)
