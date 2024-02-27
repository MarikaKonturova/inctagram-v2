import { ConvertedImage, IImage, PostImages } from 'shared/types/post'
import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'

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
