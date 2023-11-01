export const MODALS = {
    GetPostModal: 1,
    EditPostModal: 2,
    DeletePostModal: 3
} as const

export type Keys = keyof typeof MODALS
export type Values = typeof MODALS[Keys]
