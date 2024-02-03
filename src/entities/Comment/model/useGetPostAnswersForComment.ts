import { useQuery } from '@tanstack/react-query'
import { PostService } from 'shared/api'

export const useGetPostAnswersForComment = (postId: number, commentId: number) => {
  const { data } = useQuery({
    enabled: !!commentId,
    queryFn: () => PostService.getAnswerForComment(postId, commentId),
    queryKey: ['postAnswers', 'postComments', commentId],
  })

  const answerForComment = data?.data

  return { answerForComment }
}
