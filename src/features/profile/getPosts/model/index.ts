import { useQuery } from '@tanstack/react-query'
import { MyPostService } from 'shared/api/post/myPostService'

export const useGetPosts = (userId: number) => {
    const { isLoading, error, data } = useQuery(['post', userId], () => MyPostService.getPosts(userId))
    const posts = data?.data

    return { posts, isLoading, error }
}

export const useGetMyPost = (postId: number) => {
    const { isLoading, error, data } = useQuery(['post', postId], () => MyPostService.getPost(postId), {
        enabled: !!postId
    })
    const post = data?.data

    return { post }
}
