import { create } from 'zustand'

type ColorType = 'danger' | 'primary' | 'success' | 'warning'
type PositionType = 'center' | 'left' | 'right'

export interface SnackbarStateType {
  isOpen: boolean
  message: null | string
  onClose: () => void
  onOpen: (message: string, type: ColorType, position: PositionType) => void
  position: PositionType
  type: ColorType
}

export const useSnackbar = create<SnackbarStateType>(set => ({
  isOpen: false,
  message: null,
  onClose() {
    set({ isOpen: false, message: null })
  },
  onOpen(message, type, position) {
    set({ isOpen: true, message, position, type })
  },
  position: 'center',
  type: 'primary',
}))
