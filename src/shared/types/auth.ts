import { type AvatarPostModel } from './post'

export interface RefreshTokenResponse {
    accessToken: string
}

export interface UserAuthModel {
    email: string
    userName: string
    userId: number
    hasBusinessAccount: boolean
}

export interface UserLoginModel {
    email: string
    password: string
}

export interface UserRegistrationModel {
    userName: string
    email: string
    password: string
}
export interface UserRegistrationError {
    errorsMessages: Array<{
        field: string
        message: string
    }>
}

export interface UserCreatePasswordModel {
    recoveryCode: string
    newPassword: string
}

export interface UseResendLinkModel {
    email: string
}

export interface PasswordRecoveryModel {
    email: string
    recaptcha: string
}

export interface ProfileAvatarModel {
    url: string
    width: number
    height: number
    fileSize: number
}

export interface ProfileDataModel {
    id: number
    userName: string
    firstName: string | null
    lastName: string | null
    dateOfBirth: string | null
    city: string
    followingCount: number
    followersCount: number
    publicationsCount: number
    aboutMe: string | null
    avatars: AvatarPostModel | null
}

export interface User {
    id: number
    userId: number
    userName: string
    avatars: {
        medium: {
            url: string
        }
    }
    isFollowedBy: boolean
    isFollowing: boolean
}
