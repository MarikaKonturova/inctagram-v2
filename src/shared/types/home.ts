import { ResponseType } from './post'

export interface Location {
  latitude: number
  longitude: number
  nameLocation: string
}

export type PublicationsResponseType = ResponseType & {
  nextCursor: number
  prevCursor: number
}
