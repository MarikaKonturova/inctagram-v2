import { type IComment } from './post'

export interface CommentatorInfo {
  userId: string
  userLogin: string
}

export interface LikesInfo {
  dislikesCount: number
  likesCount: number
  myStatus: string
}

export type AnswerType = Omit<IComment, 'answerCount' | 'postId'> & {
  commentId: number
}
