export interface Comment {
    id: string
    content: string
    commentatorInfo: CommentatorInfo
    createdAt: string
    likesInfo: LikesInfo
}

export interface CommentatorInfo {
    userId: string
    userLogin: string
}

export interface LikesInfo {
    likesCount: number
    dislikesCount: number
    myStatus: string
}
