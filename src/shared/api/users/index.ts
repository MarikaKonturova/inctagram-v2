import { $api } from 'shared/api'
import { type Post } from 'shared/types/post'

export const UsersService = {
  addToFavourites(postId: number) {
    return $api.post<Post>(`/users/favorite/${postId}`)
  },
  follow(selectedUserId: number) {
    return $api.post('/users/following', { selectedUserId })
  },

  getFollowersUsers(userName: string, searchUser: string) {
    const queryParams = {
      cursor: 0,
      pageNumber: 1,
      pageSize: 12,
      search: searchUser,
    }

    return $api.get(`/users/${userName}/following`, { params: queryParams })
  },

  getFollowingUsers(userName: string, searchUser: string) {
    const queryParams = {
      cursor: 0,
      pageNumber: 1,
      pageSize: 12,
      search: searchUser,
    }

    return $api.get(`/users/${userName}/followers`, { params: queryParams })
  },

  unfollow(userId: number) {
    return $api.delete(`/users/follower/${userId}`)
  },
}
