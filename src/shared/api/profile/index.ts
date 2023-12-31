import { type ProfileDataModel } from '../../types/auth'
import { $api } from '../api'

export const ProfileService = {
    uploadAvatar (file: FormData) {
        return $api.post('/users/profile/avatar', file, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
    },

    deleteAvatar () {
        return $api.delete('/users/profile/avatar')
    },

    getProfileData () {
        return $api.get<ProfileDataModel>('/users/profile')
    },

    updateProfileData (body: Omit<ProfileDataModel, 'avatars' | 'id'>) {
        return $api.put<ProfileDataModel>('/users/profile', body)
    },

    subscribeOrUnsubscribe (userId: string) {
        return $api.patch<ProfileDataModel>(`/users/${userId}/subscribe`)
    }
}
