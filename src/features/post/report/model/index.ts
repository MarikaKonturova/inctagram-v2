import { useMutation } from '@tanstack/react-query'
import { PostService } from 'shared/api'

export const useReport = () => {
    // TODO: доделать репорт
    const { mutate: report } = useMutation({
        mutationFn: PostService.report
    })
    return { report }
}
