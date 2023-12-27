import { type Comment } from './post'

export interface CommentatorInfo {
  userId: string
  userLogin: string
}

export interface LikesInfo {
  dislikesCount: number
  likesCount: number
  myStatus: string
}

export type AnswerType = Omit<Comment, 'answerCount' | 'postId'> & {
  commentId: number
}
