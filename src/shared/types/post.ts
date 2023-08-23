import { type ProfileAvatarModel, type ProfileDataModel } from './auth'

export interface NewPostType {
    description: string
    files: string
}

interface NewestLikes {
    userId: string
    login: string
    addedAt: string
}

interface LikesInfoType {
    likesCount: number
    dislikesCount: number
    myStatus: string
    newestLikes: NewestLikes[]
}

export interface PostResponseType {
    id: string
    photos: string
    description: string
    createdAt: string
    updatedAt: string
    extendedLikesInfo: LikesInfoType
}

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
