import { useInfiniteQuery, useQuery } from '@tanstack/react-query'
import { MyPostService } from 'shared/api/post/myPostService'

export const useGetPosts = (userId: number) => {
    const {
        isLoading,
        error,
        data,
        fetchNextPage,
        isFetchingNextPage,
        hasNextPage,
        isSuccess
    } = useInfiniteQuery(['post', userId], ({ pageParam = 1 }) => MyPostService.getPosts(userId, pageParam), {
        getNextPageParam: (lastPage) => {
            return lastPage.page < lastPage.pagesCount ? lastPage.page + 1 : undefined
        }
    })

    return {
        data,
        isLoading,
        error,
        fetchNextPage,
        isFetchingNextPage,
        hasNextPage,
        isSuccess
    }
}

export const useGetMyPost = (postId: number) => {
    const {
        isLoading,
        error,
        data
    } = useQuery(['post', postId], () => MyPostService.getPost(postId), {
        enabled: !!postId
    })
    const post = data?.data

    return { post }
}
