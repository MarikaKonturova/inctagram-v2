import { $api } from '../api'

export const FavoritesService = {
    getFavoritesPosts: async ({ userName, pageParam }: { userName: string | undefined, pageParam: number }) => {
        const res = await $api
            .get(`/users/${userName as string}/favorites?cursor=0&pageSize=10&pageNumber=${pageParam}`)

        const data = res.data

        return { ...data, pageParam }
    }
}
