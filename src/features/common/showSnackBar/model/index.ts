import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'

type color = 'success' | 'danger' | 'warning' | 'primary'
type positionType = 'left' | 'center' | 'right'

export interface useSnackbarStateType {
    isOpen: boolean
    message: null | string
    type: color
    position: positionType
    onOpen: (message: string, type: color, position: positionType) => void
    onClose: () => void
}

export const useSnackbar = create(immer<useSnackbarStateType>((set) => ({
    isOpen: false,
    message: null,
    position: 'center',
    type: 'primary',
    onOpen (message, type, position) {
        set({ isOpen: true, message, type, position })
    },
    onClose () {
        set({ isOpen: false, message: null })
    }
})))
