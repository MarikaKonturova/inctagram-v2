import { $api } from 'shared/api'
import { IComment, type Post, ResponseType } from 'shared/types/post'
import { IFavoritePostsParams } from 'shared/types/users'

export const UsersService = {
  addToFavourites(postId: number) {
    return $api.post<Post>(`/users/favorite/${postId}`)
  },

  follow(selectedUserId: number) {
    return $api.post('/users/following', { selectedUserId })
  },

  async getFavoritesPosts({ cursor, pageParam, pageSize, userName }: IFavoritePostsParams) {
    const res = await $api.get(
      `/users/${userName}/favorites?cursor=${cursor || 0}&pageSize=${pageSize || 8}&pageNumber=${
        pageParam || 1
      }`
    )
    const data = res.data

    return { ...data, pageParam }
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

  getUserByName(userName: string) {
    return $api.get(`/users/${userName}`)
  },

  async getUserSearch(search: string, pageNumber: number) {
    const res = await $api.get<any>(`/users`, {
      params: {
        pageNumber,
        pageSize: 10,
        search,
      },
    })

    return res.data
  },

  unfollow(userId: number) {
    return $api.delete(`/users/follower/${userId}`)
  },
}
