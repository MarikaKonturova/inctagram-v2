import { $api } from 'shared/api'
import { type AnswersForComment, type Comment } from 'shared/types/comment'

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
    },
    likeComment ({ postId, commentId, likeStatus }: { postId: number, commentId: number, likeStatus: string }) {
        return $api.put(`/posts/${postId}/comments/${commentId}/like-status`, { likeStatus })
    },
    likeAnswer ({ postId, commentId, answerId, likeStatus }:
    { postId: number, commentId: number, answerId: number, likeStatus: string }) {
        return $api.put(`/posts/${postId}/comments/${commentId}/answers/${answerId}/like-status`, { likeStatus })
    },
    answerForComment (postId: number, commentId: number, answer: Pick<Comment, 'content'>) {
        return $api.post<Comment>(`/posts/${postId}/comments/${commentId}/answers`, answer)
    },
    getAnswerForComment (postId: number, commentId: number) {
        return $api.get<AnswersForComment>(`/posts/${postId}/comments/${commentId}/answers`)
    }
}
