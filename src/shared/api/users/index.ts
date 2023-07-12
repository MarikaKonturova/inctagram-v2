import { $api } from 'shared/api/api'
import { type Post } from 'shared/types/post'

// TODO: доделать API
// TODO: сделать enum для API routes
export const UsersService = {

    addToFavourites (postId: string) {
        return $api.post<Post>(`/users-posts/${postId}`)
    }

}
