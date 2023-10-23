import { type ProfileAvatarModel, type ProfileDataModel } from './auth'

export interface Post {
    id: string
    photos: string
    description: string
    createdAt: string
    updatedAt: string
}

export interface PostImage {
    uploadId: string
    versions: {
        huge: PostImageVersion
        large: PostImageVersion
    }
}
interface PostImageVersion {
    url: string
    width: number
    height: number
}
export interface PostsImage {
    images: PostImage[]
}

export interface NewPost {
    description: string
    childrenMetadata: Array<{
        uploadId: string
    }>
}

export interface PostResponse {
    id: number
    ownerId: number
    userName: string
    avatars: AvatarPostModel
    description: string
    location: string
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

export interface GetPostsResponse {
    totalCount: number
    pagesCount: number
    page: number
    pageSize: number
    items: PostResponse[]
}
export interface PostCommentsResponse {
    totalCount: number
    pagesCount: number
    page: number
    pageSize: number
    items: Comment[]
}

export interface AvatarPostModel {
    thumbnail: ProfileAvatarModel
    medium: ProfileAvatarModel
}

export interface Comment {
    id: number
    postId: number
    content: string
    createdAt: string
    answerCount: number
    likeCount: number
    isLiked: boolean
    from: {
        id: number
        avatars: AvatarPostModel
        username: string }

}

interface FavoritePost {
    id: number
    ownerId: number
    description: string
    location: {
        nameLocation: string
        latitude: number
        longitude: number
    }
    userName: string
    avatars: AvatarVersions
    images: Image[]
    createdAt: string
    updatedAt: string
    commentCount: number
    likeCount: number
    isLiked: boolean
    newLikes: Like[]
    isFavorite: boolean
    isFollowing: boolean
    isFollowedBy: boolean
}

interface AvatarVersion {
    url: string
    width: number
    height: number
    fileSize: number
}

interface AvatarVersions {
    thumbnail: AvatarVersion
    medium: AvatarVersion
}

interface ImageVersion {
    url: string
    width: number
    height: number
    fileSize: number
}

interface Image {
    uploadId: string
    versions: {
        huge: ImageVersion
        large: ImageVersion
    }
}

interface Like {
    id: number
    userName: string
    avatars: AvatarVersions
}
export interface FavoritesType {
    totalCount: number
    pagesCount: number
    page: number
    pageSize: number
    prevCursor: number
    nextCursor: number
    items: FavoritePost[]
}
