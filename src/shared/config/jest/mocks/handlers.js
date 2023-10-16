import { rest } from 'msw'

export const TEST_BASE_URL = 'https://twin.cygan.lol'

const handlers = [
    rest.post('https://twin.cygan.lol/auth/registration', async (req, res, ctx) => {
        const { userName, email, password } = await req.json()

        sessionStorage.setItem('is-authenticated', 'true')

        return res(
            ctx.status(204), ctx.json({})

        )
    }),
    rest.get('https://pokeapi.co/api/v2/pokemon/3', (req, res, ctx) => {
        return res(
            ctx.json({ name: 'pikachu' })
        )
    })
]

module.exports = { handlers }
