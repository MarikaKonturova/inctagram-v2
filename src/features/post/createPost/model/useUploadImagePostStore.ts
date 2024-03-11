import { IImage, PostImages } from 'shared/types/post'
import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'
export interface StateType {
  description: string
  images: PostImages<IImage>
  imagesIds: string[]
  location: string
  setAspect: (payload: { aspect: number | undefined; imageId: string }) => void
  setConvertedImages: (payload: { filteredSrc: string; imageId: string }) => void
  setCroppedImage: (payload: { croppedSrc: string; imageId: string }) => void
  setDescription: (payload: StateType['description']) => void
  setFilter: (payload: { filter: string; imageId: string }) => void
  setImages: (payload: StateType['images']) => void
  setLocation: (payload: StateType['location']) => void
  setReset: () => void
  setZoom: (payload: { imageId: string; zoom: number }) => void
}

export const useUploadImagePostStore = create(
  immer<StateType>(set => ({
    description: '',
    images: {},
    imagesIds: [],
    location: '',

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

    setConvertedImages: ({ filteredSrc, imageId }) => {
      set(state => ({
        ...state,
        images: { ...state.images, [imageId]: { ...state.images[imageId], filteredSrc } },
      }))
    },
    setCroppedImage: ({ croppedSrc, imageId }: { croppedSrc: string; imageId: string }) => {
      set(state => ({
        ...state,
        images: { ...state.images, [imageId]: { ...state.images[imageId], croppedSrc } },
      }))
    },
    setDescription: payload => {
      set({ description: payload })
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
    setLocation: payload => {
      set({ location: payload })
    },
    setReset: () => {
      set({ description: '', images: {}, imagesIds: [], location: '' })
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
