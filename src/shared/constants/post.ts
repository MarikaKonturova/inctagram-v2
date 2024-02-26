export const MODALS = {
  EditPostModal: 2,
  GetPostModal: 1,
} as const

export type Keys = keyof typeof MODALS
export type Values = (typeof MODALS)[Keys]
