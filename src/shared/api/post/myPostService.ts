import { $api } from 'shared/api'

import {
  type IComment,
  type PostResponse,
  type PostsImage,
  type ResponseType,
} from '../../types/post'

const DEFAULT_POSTS_COUNT = 8

export const MyPostService = {
  createNewPost(newPost: FormData) {
    return $api.post<PostResponse>('/posts', newPost)
  },
  createPostsImage(file: any) {
    return $api.post<PostsImage>('/posts/image', file, {
      headers: {
        'Content-type': 'multipart/form-data',
      },
    })
  },
  deletePost(postId: number) {
    return $api.delete(`/posts/${postId}`)
  },
  deletePostsImage(uploadId: string) {
    return $api.delete(`/posts/image/${uploadId}`)
  },
  editPost(postId: number, data: Record<'description', string>) {
    return $api.put(`/posts/${postId}`, data)
  },
  getPost(postId: number) {
    return $api.get<PostResponse>(`/posts/p/${postId}`)
  },
  async getPostComments(postId: number, pageNumber: number) {
    const res = await $api.get<ResponseType<IComment[]>>(`/posts/${postId}/comments`, {
      params: {
        pageNumber,
        pageSize: 10,
      },
    })

    return res.data
  },
  getPosts(userName: string, pageNumber: number) {
    return $api
      .get<ResponseType>(`/posts/${userName}`, {
        params: {
          pageNumber,
          pageSize: DEFAULT_POSTS_COUNT,
        },
      })
      .then(res => res.data)
  },
}
