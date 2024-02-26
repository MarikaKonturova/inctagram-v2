import { useQuery } from '@tanstack/react-query'
import { MyPostService } from 'shared/api'

export const useGetMyPost = (postId: number) => {
  const { data, error, isLoading } = useQuery(
    ['post', postId],
    () => MyPostService.getPost(postId),
    {
      enabled: !!postId,
    }
  )
  const post = data?.data

  return { post }
}
