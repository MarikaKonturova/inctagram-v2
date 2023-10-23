import { useInfiniteQuery } from '@tanstack/react-query'
import { FavoritesService } from 'shared/api/favorites'

export const useGetFavoritesData = (userName: string | undefined) => {
    const {
        data,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        isSuccess,
        isLoading,
        status
    } = useInfiniteQuery({
        queryKey: ['favorites', userName],
        queryFn: ({ pageParam = 1 }) => {
            return FavoritesService.getFavoritesPosts({ userName, pageParam })
        },
        getNextPageParam: lastPage => {
            if (lastPage.pageParam as number + 1 > lastPage.pageCount) {
                return false
            }
            return lastPage.pageParam as number + 1
        },
        enabled: !!userName
    })

    return {
        data,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        isSuccess,
        isLoading,
        status
    }
}
