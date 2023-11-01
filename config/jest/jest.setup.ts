/* eslint-disable no-undef */
import '@testing-library/jest-dom/extend-expect'
import { server } from 'shared/config/jest/mocks/server'
require('@testing-library/jest-dom')
// Establish API mocking before all tests.
beforeAll(() => { server.listen({ onUnhandledRequest: 'warn' }) })

// Reset any request handlers that we may add during the tests,
// so they don't affect other tests.
afterEach(() => { server.resetHandlers() })

// Clean up after the tests are finished.
afterAll(() => {
    server.close()
})
