import { type ProfileDataModel } from './auth'
import { type AvatarPostModel, type PostImage } from './post'

export interface Location {
    nameLocation: string
    latitude: number
    longitude: number
}

export interface Thumbnail {
    url: string
    width: number
    height: number
    fileSize: number
}

export interface Medium {
    url: string
    width: number
    height: number
    fileSize: number
}

export interface NewLikesAvatars {
    thumbnail: Thumbnail
    medium: Medium
}

export interface ResponseItem {
    id: number
    ownerId: number
    description: string
    location: Location
    userName: string
    avatars: AvatarPostModel
    images: PostImage[]
    createdAt: string
    updatedAt: string
    commentCount: number
    likeCount: number
    isLiked: boolean
    newLikes: Array<Pick <ProfileDataModel, 'id' | 'avatars'> & { username: string }>
    isFavorite: boolean
    isFollowing: boolean
    isFollowedBy: boolean
}

export interface PublicationsResponse {
    totalCount: number
    pagesCount: number
    page: number
    pageSize: number
    prevCursor: number
    nextCursor: number
    items: ResponseItem[]
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
