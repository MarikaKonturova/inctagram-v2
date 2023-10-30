import { $api } from 'shared/api'
import { type PostsImage, type PostResponse, type PostResponseType, type Comment } from '../../types/post'

export const MyPostService = {
    createPostsImage (file: any) {
        return $api.post<PostsImage>('/posts/image', file, {
            headers: {
                'Content-type': 'multipart/form-data'
            }
        })
    },
    createNewPost (newPost: FormData) {
        return $api.post<PostResponse>('/posts', newPost)
    },
    deletePostsImage (uploadId: string) {
        return $api.delete(`/posts/image/${uploadId}`)
    },
    getPosts (userName: string, pageNumber: number) {
        return $api.get<PostResponseType>(`/posts/${userName}`, {
            params: {
                pageNumber,
                pageSize: 5
            }
        }).then(res => res.data)
    },
    getPost (postId: number) {
        return $api.get<PostResponse>(`/posts/p/${postId}`)
    },
    editPost (postId: number, data: Record<'description', string>) {
        return $api.put(`/posts/${postId}`, data)
    },
    deletePost (postId: number) {
        return $api.delete(`/posts/${postId}`)
    },
    getPostComments (postId: number) {
        return $api.get<PostResponseType<Comment[]>>(`/posts/${postId}/comments`)
    }
}
