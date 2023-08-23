import { $api } from 'shared/api/api'
import { type Comment } from 'shared/types/comment'

// TODO: доделать API
// TODO: сделать enum для API routes
export const PostService = {
    like () {
        return $api.get<any>('/path')
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
