import { $api } from 'shared/api'
import { type AnswerType } from 'shared/types/comment'
import { type ResponseType } from 'shared/types/post'

// TODO: доделать API
// TODO: сделать enum для API routes
export const PostService = {
  answerForComment(postId: number, commentId: number, answer: Record<'content', string>) {
    return $api.post<Comment>(`/posts/${postId}/comments/${commentId}/answers`, answer)
  },
  comment(postId: number, comment: Record<'content', string>) {
    return $api.post<Comment>(`/posts/${postId}/comments`, comment)
  },
  getAnswerForComment(postId: number, commentId: number) {
    return $api.get<ResponseType<AnswerType[]>>(`/posts/${postId}/comments/${commentId}/answers`)
  },
  like({ likeStatus, postId }: { likeStatus: string; postId: number }) {
    return $api.put(`/posts/${postId}/like-status`, { likeStatus })
  },
  likeAnswer({
    answerId,
    commentId,
    likeStatus,
    postId,
  }: {
    answerId: number
    commentId: number
    likeStatus: string
    postId: number
  }) {
    return $api.put(`/posts/${postId}/comments/${commentId}/answers/${answerId}/like-status`, {
      likeStatus,
    })
  },
  likeComment({
    commentId,
    likeStatus,
    postId,
  }: {
    commentId: number
    likeStatus: string
    postId: number
  }) {
    return $api.put(`/posts/${postId}/comments/${commentId}/like-status`, { likeStatus })
  },
  report() {
    return $api.get<any>('/path')
  },
  share() {
    return $api.get<any>('/path')
  },
}
