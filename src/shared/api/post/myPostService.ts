import { $api } from 'shared/api'

import {
  type Comment,
  type PostResponse,
  type PostsImage,
  type ResponseType,
} from '../../types/post'

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
  getPostComments(postId: number) {
    return $api.get<ResponseType<Comment[]>>(`/posts/${postId}/comments`)
  },
  getPosts(userName: string, pageNumber: number) {
    return $api
      .get<ResponseType>(`/posts/${userName}`, {
        params: {
          pageNumber,
          pageSize: 5,
        },
      })
      .then(res => res.data)
  },
}
