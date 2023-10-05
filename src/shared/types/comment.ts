import { type Comment } from './post'

export interface CommentatorInfo {
    userId: string
    userLogin: string
}

export interface LikesInfo {
    likesCount: number
    dislikesCount: number
    myStatus: string
}

export type AnswerType = Omit<Comment, 'postId' | 'answerCount'> & {
    commentId: number
}
