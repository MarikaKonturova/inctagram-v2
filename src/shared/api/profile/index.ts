import { type ProfileDataModel } from '../../types/auth'
import { $api } from '../api'

export const ProfileService = {
  deleteAvatar() {
    return $api.delete('/users/profile/avatar')
  },

  getProfileData() {
    return $api.get<ProfileDataModel>('/users/profile')
  },

  subscribeOrUnsubscribe(selectedUserId: number) {
    return $api.post('/users/following', { selectedUserId })
  },

  updateProfileData(body: Omit<ProfileDataModel, 'avatars' | 'id'>) {
    return $api.put<ProfileDataModel>('/users/profile', body)
  },

  uploadAvatar(file: FormData) {
    return $api.post('/users/profile/avatar', file, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
  },
}
