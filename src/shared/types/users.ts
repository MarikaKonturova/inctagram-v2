export interface IFavoritePostsParams {
  cursor?: number
  pageParam: number
  pageSize?: number
  userName: string
}
export interface User {
  avatars: Avatar | null
  createdAt: string
  firstName: null | string
  id: number
  lastName: null | string
  userName: string
}

export interface Avatar {
  medium: {
    fileSize: number
    height: number
    url: string
    width: number
  }
  thumbnail: {
    fileSize: number
    height: number
    url: string
    width: number
  }
}
