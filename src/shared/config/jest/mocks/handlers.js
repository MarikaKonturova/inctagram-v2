import { rest } from 'msw'

export const TEST_BASE_URL = 'http://localhost'

const handlers = [
  rest.post(`${TEST_BASE_URL}/auth/registration`, async (req, res, ctx) => {
    const { email, password, userName } = await req.json()

    sessionStorage.setItem('is-authenticated', 'true')

    return res(ctx.status(204), ctx.json({}))
  }),
]

module.exports = { handlers }
