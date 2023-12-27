import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'

type color = 'danger' | 'primary' | 'success' | 'warning'
type positionType = 'center' | 'left' | 'right'

export interface useSnackbarStateType {
  isOpen: boolean
  message: null | string
  onClose: () => void
  onOpen: (message: string, type: color, position: positionType) => void
  position: positionType
  type: color
}

export const useSnackbar = create<useSnackbarStateType>(set => ({
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
