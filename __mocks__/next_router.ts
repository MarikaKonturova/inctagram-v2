import { type NextRouter } from 'next/router'

const useRouter: jest.Mock<Partial<NextRouter>> = jest.fn()

useRouter.mockImplementation(() => ({
    push: jest.fn(),
    query: {},
    asPath: ''
}))

export { useRouter }
