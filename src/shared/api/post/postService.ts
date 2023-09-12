import { $api } from 'shared/api'
import { type Comment } from 'shared/types/comment'

// TODO: доделать API
// TODO: сделать enum для API routes
export const PostService = {
    like ({ postId, likeStatus }: { postId: number, likeStatus: string }) {
        return $api.put(`/posts/${postId}/like-status`, { likeStatus })
    },
    comment (postId: number, comment: Pick<Comment, 'content'>) {
        return $api.post<Comment>(`/posts/${postId}/comments`, comment)
    },
    share () {
        return $api.get<any>('/path')
    },

    report () {
        return $api.get<any>('/path')
    }
}
