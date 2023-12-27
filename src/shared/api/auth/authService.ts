import { type AxiosError, type AxiosResponse } from 'axios'
import { $api } from 'shared/api/api'

import {
  type PasswordRecoveryModel,
  type UseResendLinkModel,
  type UserAuthModel,
  type UserCreatePasswordModel,
  type UserLoginModel,
  type UserRegistrationModel,
} from '../../types/auth'

export const AuthService = {
  confirmEmail(confirmationCode: string) {
    return $api.post('auth/registration-confirmation', { confirmationCode })
  },

  createPassword(params: UserCreatePasswordModel) {
    return $api.post('/auth/new-password', params)
  },

  login(params: UserLoginModel) {
    return $api
      .post<UserLoginModel, AxiosResponse<{ accessToken: string }>>('auth/login', params)
      .then(response => {
        localStorage.setItem('token', response.data.accessToken)
      })
  },

  logout() {
    return $api.post('auth/logout').then(() => {
      localStorage.removeItem('token')
    })
  },

  me() {
    return $api.get<UserAuthModel>('auth/me')
  },

  passwordRecovery(params: PasswordRecoveryModel) {
    return $api.post('auth/password-recovery', params)
  },

  registration(params: UserRegistrationModel) {
    return $api.post<null, AxiosResponse, UserRegistrationModel>('/auth/registration', params)
  },

  resendEmail(params: UseResendLinkModel) {
    return $api.post('/auth/registration-email-resending', params)
  },
}
