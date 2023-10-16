import axios from 'axios'
import { rest } from 'msw'
import { AuthService } from 'shared/api'
import { server } from 'shared/config/jest/mocks/server'

const fetchData = () => {
    return axios.get('https://pokeapi.co/api/v2/pokemon/3')
        .then(res => {
            return res.data.name
        })
        .catch(err => {
            console.log(err)
        })
}

export default fetchData

const data = {
    userName: 'testuser',
    email: 'test@example.com',
    password: 'testpasswordQ1q**'
}
describe('AuthService function', () => {
    it('should return the correct status data', async () => {
        const response = await AuthService.registration(data)
        expect(AuthService.registration).toBeCalled()
        expect(response.status).toBe(204)
    })
    it('Successfully fetches Pokemon name', async () => {
        const pokemon = await fetchData()
        expect(pokemon).toEqual('pikachu')
    })
})
