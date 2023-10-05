import { $api } from 'shared/api'
import { type AnswerType } from 'shared/types/comment' // , type Comment
import { type PostResponseType } from 'shared/types/post'

// TODO: доделать API
// TODO: сделать enum для API routes
export const PostService = {
    like ({ postId, likeStatus }: { postId: number, likeStatus: string }) {
        return $api.put(`/posts/${postId}/like-status`, { likeStatus })
    },
    comment (postId: number, comment: Record<'content', string>) {
        return $api.post<Comment>(`/posts/${postId}/comments`, comment)
    },
    share () {
        return $api.get<any>('/path')
    },
    report () {
        return $api.get<any>('/path')
    },
    likeComment ({ postId, commentId, likeStatus }: { postId: number, commentId: number, likeStatus: string }) {
        return $api.put(`/posts/${postId}/comments/${commentId}/like-status`, { likeStatus })
    },
    likeAnswer ({ postId, commentId, answerId, likeStatus }:
    { postId: number, commentId: number, answerId: number, likeStatus: string }) {
        return $api.put(`/posts/${postId}/comments/${commentId}/answers/${answerId}/like-status`, { likeStatus })
    },
    answerForComment (postId: number, commentId: number, answer: Record<'content', string>) {
        return $api.post<Comment>(`/posts/${postId}/comments/${commentId}/answers`, answer)
    },
    getAnswerForComment (postId: number, commentId: number) {
        return $api.get<PostResponseType<AnswerType[]>>(`/posts/${postId}/comments/${commentId}/answers`)
    }
}
