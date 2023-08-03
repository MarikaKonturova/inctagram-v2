import { $api } from 'shared/api/api'
import { type PostsImage, type Post, type NewPost, type PostResponse, type GetPostsResponse } from '../../types/post'

export const MyPostService = {
    createPostsImage (file: any) {
        return $api.post<PostsImage>('/posts/image', file, {
            headers: {
                'Content-type': 'multipart/form-data'
            }
        })
    },
    createNewPost (newPost: FormData) {
        console.log(newPost)
        return $api.post<PostResponse>('/posts', newPost)
    },
    deletePostsImage (uploadId: string) {
        return $api.delete(`/posts/image/${uploadId}`)
    },
    getPosts (userId: number) {
        return $api.get<GetPostsResponse>(`/posts/${userId}`)
    },
    getPost (postId: number) {
        return $api.get<PostResponse>(`/posts/p/${postId}`)
    },
    editPost (postId: number, data: Record<'description', string>) {
        return $api.put(`/posts/${postId}`, data)
    },
    update (postId: string, newPost: Post) {
        return $api.put<Post>(`/posts/${postId}`, newPost)
    },
    deletePost (postId: number) {
        return $api.delete(`/posts/${postId}`)
    }
}
