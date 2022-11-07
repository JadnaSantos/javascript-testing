const assert = require('assert')
const {describe, it} = require('mocha')
const request = require('supertest')

const app = require('./api')

describe('API Suite test', () => {
    describe('/contact', () => {
        it('should request the contact page and return HTTP 200 OK', async() => {
            const response = await request(app).get('/contact').expect(200)
            assert.deepStrictEqual(response.text, 'contact us page')
        })
    })

    describe('/hi', () => {
        it('should request an inexistent route /hi and redirect to /hello', async() => {
            const response = await request(app).get('/hi').expect(200)
            assert.deepStrictEqual(response.text, 'Hello World!')
        })
    })

    describe('/login', () => {
        it('should login sucessfully on the login route and return HTTP Status 200', async() => {
            const response = await request(app).post('/login').send({username: 'Jadna', password: '1234'}).expect(200)
            console.log(response)
            assert.deepStrictEqual(response.text, 'Login has sucessfully')
        })

        it('should unauthorize a request when requesting it using wrong credential and return HTTP', async() => {
            const response = await request(app).post('/login').send({username: 'xUXADAD', password: '1234'}).expect(401)
            assert.ok(response.unauthorized)
            assert.deepStrictEqual(response.text, 'Login Fail')
        })
    })
})