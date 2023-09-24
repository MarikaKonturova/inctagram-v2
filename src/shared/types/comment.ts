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

export interface AnswersForComment {
    page: number
    pageSize: number
    pagesCount: number
    totalCount: number
    items: ItemsForAnswers[]
}

export interface ItemsForAnswers {
    commentId: number
    content: string
    createdAt: string
    id: number
    isLiked: boolean
    likeCount: number
    from: {
        id: number
        userName: string
        avatars: {
            thumbnail: {
                url: string
            }
        }
    }
}
