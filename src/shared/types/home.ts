import { type ProfileDataModel } from './auth'
import { type AvatarPostModel, type PostImage } from './post'

export interface Location {
  latitude: number
  longitude: number
  nameLocation: string
}

export interface Thumbnail {
  fileSize: number
  height: number
  url: string
  width: number
}

export interface Medium {
  fileSize: number
  height: number
  url: string
  width: number
}

export interface NewLikesAvatars {
  medium: Medium
  thumbnail: Thumbnail
}

export interface ResponseItem {
  avatars: AvatarPostModel
  commentCount: number
  createdAt: string
  description: string
  id: number
  images: PostImage[]
  isFavorite: boolean
  isFollowedBy: boolean
  isFollowing: boolean
  isLiked: boolean
  likeCount: number
  location: Location
  newLikes: Array<Pick<ProfileDataModel, 'avatars' | 'id'> & { username: string }>
  ownerId: number
  updatedAt: string
  userName: string
}

export interface PublicationsResponse {
  items: ResponseItem[]
  nextCursor: number
  page: number
  pageSize: number
  pagesCount: number
  prevCursor: number
  totalCount: number
}

// export interface GetPublicationsResponse {
//     totalCount: number
//     pagesCount: number
//     page: number
//     pageSize: number
//     items: PublicationsResponse[]
// }

export interface PublicationsInPagesResponse {
  items: ResponseItem[]
  nextCursor: number
  page: number
  pageSize: number
  pagesCount: number
  prevCursor: number
  totalCount: number
}
