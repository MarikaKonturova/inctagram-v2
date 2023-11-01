import { AuthService } from 'shared/api'

const data = {
    userName: 'testuser',
    email: 'test@example.com',
    password: 'testpasswordQ1q**'
}
describe('AuthService function', () => {
    it('should return the correct status data', async () => {
        const response = await AuthService.registration(data)
        expect(response.status).toBe(204)
    })
})
