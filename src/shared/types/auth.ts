import { type AvatarPostModel } from './post'

export interface RefreshTokenResponse {
  accessToken: string
}

export interface UserAuthModel {
  email: string
  hasBusinessAccount: boolean
  userId: number
  userName: string
}

export interface UserLoginModel {
  email: string
  password: string
}

export interface UserRegistrationModel {
  email: string
  password: string
  userName: string
}
export interface UserError {
  messages: Array<{
    field: string
    message: string
  }>
}

export interface UserCreatePasswordModel {
  newPassword: string
  recoveryCode: string
}

export interface UseResendLinkModel {
  email: string
}

export interface PasswordRecoveryModel {
  email: string
  recaptcha: string
}

export interface ProfileAvatarModel {
  fileSize: number
  height: number
  url: string
  width: number
}

export interface ProfileDataModel {
  aboutMe: null | string
  avatars: AvatarPostModel | null
  city: string
  dateOfBirth: null | string
  firstName: null | string
  followersCount: number
  followingCount: number
  id: number
  lastName: null | string
  publicationsCount: number
  userName: string
}

export interface User {
  avatars: {
    medium: {
      url: string
    }
  }
  id: number
  isFollowedBy: boolean
  isFollowing: boolean
  userId: number
  userName: string
}

export interface GoogleAndGitHubAuthProps {
  method?: 'GitHub' | 'Google'
  type: 'Login' | 'Registration'
}
