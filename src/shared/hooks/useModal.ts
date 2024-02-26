import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'

export interface useModalStateType {
  isOpen: boolean
  setIsOpen: (value: boolean) => void
}

export const useModal = create<useModalStateType>(set => ({
  isOpen: false,
  setIsOpen: (value: boolean) => {
    set(state => ({
      ...state,
      isOpen: value,
    }))
  },
}))
