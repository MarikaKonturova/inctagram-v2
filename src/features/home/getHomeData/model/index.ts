import { useInfiniteQuery } from '@tanstack/react-query'
import { HomeService } from 'shared/api/home'

export const useGetHomeData = () => {
    const {
        isFetchingNextPage,
        status,
        isSuccess,
        data,
        fetchNextPage,
        hasNextPage,
        isLoading
    } = useInfiniteQuery(
        ['publicationsData'],
        ({ pageParam = 1 }) => HomeService.getProfileData(pageParam)
        ,
        {
            getNextPageParam: (lastPage) => {
                return lastPage.data.page < lastPage.data.pagesCount ? lastPage.data.page + 1 : undefined
            }
        }
    )
    return { isFetchingNextPage, isSuccess, isLoading, data, fetchNextPage, status, hasNextPage }
}
