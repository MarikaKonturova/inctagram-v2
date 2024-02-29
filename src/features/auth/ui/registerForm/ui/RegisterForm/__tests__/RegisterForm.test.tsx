/* eslint-disable testing-library/no-wait-for-multiple-assertions */
import { QueryClient } from '@tanstack/query-core'
import { QueryClientProvider } from '@tanstack/react-query'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { rest } from 'msw'
import { I18nextProvider } from 'react-i18next'
import { RegisterForm } from 'features/auth'
import { RouterContext } from 'next/dist/shared/lib/router-context'
import { server } from 'shared/config/jest/mocks/server'
import { createMockRouter } from '../../../../../../../../__mocks__/next_router'
import i18n from '../../../../../../../../i18next'

const data = {
  userName: 'testuser',
  email: 'test@example.com',
  password: 'testpasswordQ1q**',
}

/* jest.mock('next/router', () => jest.requireActual('next-router-mock')) */

describe('RegisterForm', () => {
  let renderComponent: () => any

  beforeEach(() => {
    const router = createMockRouter({})
    const queryClient = new QueryClient()

    // eslint-disable-next-line testing-library/no-render-in-lifecycle
    renderComponent = () =>
      render(
        <RouterContext.Provider value={router}>
          <QueryClientProvider client={queryClient}>
            <I18nextProvider i18n={i18n}>
              <RegisterForm />
            </I18nextProvider>
          </QueryClientProvider>
        </RouterContext.Provider>
      )
  })

  it('renders without crashing', () => {
    renderComponent()

    const signUpButton = screen.getByRole('button', { name: 'Sign Up' })

    expect(signUpButton).toBeInTheDocument()
  })

  it('submits the form with valid data', async () => {
    const router = createMockRouter({})
    const queryClient = new QueryClient()

    render(
      <RouterContext.Provider value={router}>
        <QueryClientProvider client={queryClient}>
          <I18nextProvider i18n={i18n}>
            <RegisterForm />
          </I18nextProvider>
        </QueryClientProvider>
      </RouterContext.Provider>
    )

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
    await userEvent.click(screen.getByTestId('sign-up-submit'))
    expect(router.push).toHaveBeenCalledWith({ pathname: '/auth/login' })
  })

  it('displays validation errors', async () => {
    renderComponent()
    const userNameInput = screen.getByPlaceholderText('Username')
    const emailInput = screen.getByPlaceholderText('Email')
    const passwordInput = screen.getByPlaceholderText('Password')
    const confPasswordInput = screen.getByPlaceholderText('Password confirmation')

    await userEvent.click(userNameInput)
    await userEvent.keyboard('{Tab}')
    await userEvent.click(emailInput)
    await userEvent.keyboard('{Tab}')
    await userEvent.click(passwordInput)
    await userEvent.keyboard('{Tab}')
    await userEvent.click(confPasswordInput)
    await userEvent.keyboard('{Tab}')
    await waitFor(() => {
      expect(screen.getAllByText('Field is required!').length).toBe(2)
      expect(
        screen.getByText(
          'Password should include one uppercase letter, ' +
            'one lowercase letter, one number and one special character'
        )
      ).toBeInTheDocument()
    })
  })

  describe('Registration Errors', () => {
    it('should fail with error if user with this email is already exist', async () => {
      const router = createMockRouter({})
      const queryClient = new QueryClient()

      render(
        <RouterContext.Provider value={router}>
          <QueryClientProvider client={queryClient}>
            <I18nextProvider i18n={i18n}>
              <RegisterForm />
            </I18nextProvider>
          </QueryClientProvider>
        </RouterContext.Provider>
      )

      server.use(
        rest.post('http://localhost/auth/registration', (req, res, ctx) => {
          return res(
            ctx.status(400),
            ctx.json({
              statusCode: 400,
              messages: [
                {
                  field: 'userName',
                  message: 'User with this userName is already exist',
                },
              ],
              error: 'BAD_REQUEST',
            })
          )
        })
      )

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
      await userEvent.click(screen.getByTestId('sign-up-submit'))

      await waitFor(() => {
        const validationText = screen.getByText('User with this userName is already exist')

        expect(validationText).toBeInTheDocument()
      })
    })
  })
})
