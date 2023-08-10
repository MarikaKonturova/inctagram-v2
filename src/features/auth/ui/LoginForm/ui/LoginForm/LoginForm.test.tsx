import { act, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { AuthService } from 'shared/api/auth/authService'
import { AppRoutes } from 'shared/config/routeConfig/path'
import { routerPush } from 'shared/hooks/routerPush'
import { type UserLoginModel } from 'shared/types/auth'
import { renderWithQueryClient } from '../../../../../../../config/jest/renderWithQueryClient'
import { LoginForm } from './LoginForm'

jest.mock('next/router', () => require('../../../../../../../config/jest/__mocks__/next_router'))
jest.mock('shared/api/auth/authService', () => ({
    AuthService: {
        login: jest.fn()
    }
}))
jest.mock('shared/lib/routerPush/routerPush', () => ({
    routerPush: jest.fn()
}))

describe('LoginForm', () => {
    it('renders without crashing', () => {
        renderWithQueryClient(<LoginForm />)
    })

    it('submits the form with valid data', async () => {
        renderWithQueryClient(<LoginForm />)

        await act(async () => {
            await userEvent.type(screen.getByPlaceholderText('Email'), 'testuser@example.com')
            await userEvent.type(screen.getByPlaceholderText('Password'), 'testpasswordQ1q**')

            await userEvent.click(screen.getByTestId('sign-in-submit'))
        })

        await waitFor(() => {
            expect(AuthService.login).toHaveBeenCalledWith({
                email: 'testuser@example.com',
                password: 'testpasswordQ1q**'
            } as UserLoginModel)
            expect(routerPush).toHaveBeenCalledWith(AppRoutes.PROFILE_SETTINGS.GENERAL_INFORMATION)
        })
    })

    it('displays server error message', async () => {
        const errorMessage = 'Invalid login or password';

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
        })
    })
})
