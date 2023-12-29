import { useMutation } from '@tanstack/react-query'
import { PostService } from 'shared/api'

export const useReport = () => {
  const { mutate: report } = useMutation({
    mutationFn: PostService.report,
  })

  return { report }
}
