import { type PostImage } from './post'

export interface RefreshTokenResponse {
    accessToken: string
}

export interface UserAuthModel {
    email: string
    userName: string
    userId: number
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

export interface ProfileDataModel {
    id: number
    userName: string
    firstName: string
    lastName: string
    dateOfBirth: string
    city: string
    aboutMe: string
    avatars: Omit<PostImage, 'uploadId'>
}
