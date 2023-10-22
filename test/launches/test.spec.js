const supertest = require('supertest');
const router = require('../../routes/index')


describe('GET /launches', () => {
    it('verificar se rota launches está funcionando',async () => {
        const response = await supertest(router).get('/launches')
        expect(response.status).toBe(200)
    })
})