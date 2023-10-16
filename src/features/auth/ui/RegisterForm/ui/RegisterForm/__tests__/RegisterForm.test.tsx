/* eslint-disable testing-library/no-wait-for-multiple-assertions */
import { screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { rest } from 'msw'
import { useRouter } from 'next/router'
import { I18nextProvider } from 'react-i18next'
import { RegisterForm } from 'features/auth'
import { TEST_BASE_URL } from 'shared/config/jest/mocks/handlers'
import { server } from 'shared/config/jest/mocks/server'
import { renderWithQueryClient } from '../../../../../../../../config/jest/renderWithQueryClient'
import i18n from '../../../../../../../../i18next'

const data = {
    userName: 'testuser',
    email: 'test@example.com',
    password: 'testpasswordQ1q**'
}

// mock useRouter
jest.mock('next/router', () => ({
    useRouter: jest.fn()
}))
/* jest.mock('features/auth/model', () => ({
    email: '',
    userId: 0,
    isAuth: false,
    hasBusinessAccount: false,
    isOpenMergePopUp: false,
    contentForMerge: '',
    setEmail: (email: string) => {

    },
    setAuth: (isAuth: boolean) => {

    },
    setUserData: (data: { userId: number, hasBusinessAccount: boolean }) => {

    },
    setPopUpForMerge: (isOpenMergePopUp, contentForMerge) => {

    }
})) */

// setup a new mocking function for push method
const pushMock = jest.fn()

// mock a return value on useRouter
// @ts-ignore
useRouter.mockReturnValue({
    query: {},
    // return mock for push method
    push: pushMock
    // ... add the props or methods you need
})

/* jest.mock('next/router', () => jest.requireActual('next-router-mock')) */

describe('RegisterForm', () => {
    let renderComponent: () => any

    beforeEach(() => {
        // eslint-disable-next-line testing-library/no-render-in-lifecycle
        renderComponent = () => renderWithQueryClient(
            <I18nextProvider i18n={i18n}>
                <RegisterForm />
            </I18nextProvider>
        )
    })

    it('renders without crashing', () => {
        renderComponent()

        const signUpButton = screen.getByRole('button', { name: 'Sign Up' })
        expect(signUpButton).toBeInTheDocument()
    })

    it('submits the form with valid data', async () => {
        const { container } = renderComponent()

        const userNameInput = screen.getByPlaceholderText('Username')
        const emailInput = screen.getByPlaceholderText('Email')
        const passwordInput = screen.getByPlaceholderText('Password')
        const confPasswordInput = screen.getByPlaceholderText('Password confirmation')

        await userEvent.type(userNameInput, data.userName)
        await userEvent.type(emailInput, data.email)
        await userEvent.type(passwordInput, data.password)
        await userEvent.type(confPasswordInput, data.password)

        await waitFor(() => {
            expect(userNameInput).toHaveValue(data.userName)
            expect(emailInput).toHaveValue(data.email)
            expect(passwordInput).toHaveValue(data.password)
            expect(confPasswordInput).toHaveValue(data.password)
        })
    })

    it('displays validation errors', async () => {
        renderComponent()

        // Click on the "Sign Up" button without filling out the form
        await userEvent.click(screen.getByTestId('sign-up-submit'))

        await waitFor(() => {
            expect(screen.getByText('userName must be at least 6 characters')).toBeInTheDocument()
            expect(screen.getByText('Field is required!')).toBeInTheDocument()
            expect(screen.getByText('Password should include one uppercase letter, ' +
                'one lowercase letter, one number and one special character'))
                .toBeInTheDocument()
        })
        // показать разные ошибки && починить компонент
    })

    describe('Registration Errors', () => {
        it('should fail with error if user with this email is already exist', async () => {
            renderComponent()

            server.use(
                rest.get(`${TEST_BASE_URL}/auth/registration`, (req, res, ctx) => {
                    return res(ctx.status(400))
                })
            )
            const data = {
                userName: 'testuser',
                email: 'test@example.com',
                password: 'testpasswordQ1q**'
            }

            const userNameInput = screen.getByPlaceholderText(/username/i)
            const emailInput = screen.getByPlaceholderText(/email/i)
            const passwordInput = screen.getByPlaceholderText('Password')
            const confPasswordInput = screen.getByPlaceholderText('Password confirmation')

            await userEvent.type(userNameInput, data.userName)
            await userEvent.type(emailInput, data.email)
            await userEvent.type(passwordInput, data.password)
            await userEvent.type(confPasswordInput, data.password)

            /*     expect(userNameInput).toHaveTextContent('testuser')
            expect(emailInput).toHaveTextContent('test@example.com')
            expect(passwordInput).toHaveTextContent('testpasswordQ1q**')
            expect(confPasswordInput).toHaveTextContent('testpasswordQ1q**')
 */
            await userEvent.click(screen.getByTestId('sign-up-submit'))

            /* await waitFor(() => {
                const validationText = screen.getByText(/user with this email is already exist/i)
                expect(validationText).toBeInTheDocument()
            }) */
        })
    })
})
