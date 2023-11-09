import { $api } from 'shared/api'
import { type Post } from 'shared/types/post'

// TODO: доделать API
// TODO: сделать enum для API routes
export const UsersService = {
    getFollowingUsers (userName: string, searchUser: string) {
        const queryParams = {
            search: searchUser,
            pageSize: 12,
            pageNumber: 1,
            cursor: 0
        }

        return $api.get(`/users/${userName}/followers`, { params: queryParams })
    },
    getFollowersUsers (userName: string, searchUser: string) {
        const queryParams = {
            search: searchUser,
            pageSize: 12,
            pageNumber: 1,
            cursor: 0
        }

        return $api.get(`/users/${userName}/following`, { params: queryParams })
    },

    addToFavourites (postId: number) {
        return $api.post<Post>(`/users/favorite/${postId}`)
    },

    follow (selectedUserId: number) {
        return $api.post('/users/following', { selectedUserId })
    },

    unfollow (userId: number) {
        return $api.delete(`/users/follower/${userId}`)
    }

}
