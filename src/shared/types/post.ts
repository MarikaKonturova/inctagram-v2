import { type ProfileAvatarModel, type ProfileDataModel } from './auth'

export interface Post {
  createdAt: string
  description: string
  id: string
  photos: string
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
  height: number
  url: string
  width: number
}
export interface PostsImage {
  images: PostImage[]
}

export interface NewPost {
  childrenMetadata: Array<{
    uploadId: string
  }>
  description: string
}

export interface PostResponse {
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
  location: string
  newLikes: Array<Pick<ProfileDataModel, 'avatars' | 'id'> & { username: string }>
  ownerId: number
  updatedAt: string
  userName: string
}

export interface ResponseType<D = PostResponse[]> {
  items: D
  page: number
  pageSize: number
  pagesCount: number
  totalCount: number
}

export interface AvatarPostModel {
  medium: ProfileAvatarModel
  thumbnail: ProfileAvatarModel
}

export interface IComment {
  answerCount: number
  content: string
  createdAt: string
  from: {
    avatars: AvatarPostModel
    id: number
    userName: string
  }
  id: number
  isLiked: boolean
  likeCount: number
  postId: number
}

interface AvatarVersion {
  fileSize: number
  height: number
  url: string
  width: number
}

interface AvatarVersions {
  medium: AvatarVersion
  thumbnail: AvatarVersion
}

interface Image {
  uploadId: string
  versions: {
    huge: ProfileAvatarModel
    large: ProfileAvatarModel
  }
}

interface Like {
  avatars: AvatarVersions
  id: number
  userName: string
}

type FavoritePostType = PostResponse & { newLikes: Like[] }

export type FavoritesType = ResponseType<FavoritePostType[]> & {
  nextCursor: number
  prevCursor: number
}
