import { act, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { AuthService } from 'shared/api'
import { AppRoutes } from 'shared/constants/path'
import { type UserLoginModel } from 'shared/types/auth'
import { LoginForm } from '../loginForm/LoginForm'

jest.mock('next/router', () => jest.requireActual('next-router-mock'))
jest.mock('shared/api/auth/authService', () => ({
  AuthService: {
    login: jest.fn(),
  },
}))
jest.mock('next/router', () => ({
  push: jest.fn(),
}))

const routerPush = {
  push: jest.fn(), // the component uses `router.push` only
}

describe('LoginForm', () => {
  /*   it('renders without crashing', () => {
        renderWithQueryClient(<LoginForm />)
    })

    it('submits the form with valid data', async () => {
        renderWithQueryClient(<LoginForm />)
 */
  // await act(async () => {
  //     await userEvent.type(screen.getByPlaceholderText('Email'), 'testuser@example.com')
  //     await userEvent.type(screen.getByPlaceholderText('Password'), 'testpasswordQ1q**')
  //     await userEvent.click(screen.getByTestId('sign-in-submit'))
  // })
  // await waitFor(() => {
  //     expect(AuthService.login).toHaveBeenCalledWith({
  //         email: 'testuser@example.com',
  //         password: 'testpasswordQ1q**'
  //     } as UserLoginModel)
  //     /*  expect(routerPush).toHaveBeenCalledWith(AppRoutes.PROFILE_SETTINGS.GENERAL_INFORMATION) */
  // })
})

it('displays server error message', async () => {
  /*  const errorMessage = 'Invalid login or password';

        (AuthService.login as jest.Mock)
            .mockRejectedValueOnce({
                response: { data: { message: errorMessage } }
            })

        renderWithQueryClient(<LoginForm />)

        await act(async () => {
            await userEvent.type(screen.getByPlaceholderText('Email'), 'testuser@example.com')
            await userEvent.type(screen.getByPlaceholderText('Password'), 'testpasswordQ1q**')
            await userEvent.click(screen.getByTestId('sign-in-submit'))
        })

        await waitFor(() => {
            expect(screen.getByText(errorMessage)).toBeInTheDocument()
        }) }) */
})
