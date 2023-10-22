const supertest = require('supertest')
const router = require('../../routes/index')


describe('GET /launches/stats',() => {
    it('verificar de rota /launches/stats retornar 200',async() => {
        const result = await supertest(router).get('/launches/stats')
        expect(result.status).toBe(200)
    })
})