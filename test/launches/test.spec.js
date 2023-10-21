const supertest = require('supertest');
const router = require('../../routes/index')


describe('GET /launches', () => {
    it('verificar se rota está funcionando',async () => {
        const response = await supertest(router).get('/launches')
        console.log(response)
        expect(response.status).toBe(200)
    })
})