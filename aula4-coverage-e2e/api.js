const http = require('http');
const DEFAULT_USER = {username: 'Jadna', password: '1234'}

const routes = {
    '/contact:get': (request, response) => {
        response.write('contact us page')
        return response.end()
    },

    '/login:post': async (request, response) => {
        for await (const data of request) {
            const user = JSON.parse(data)
            if(user.username !== DEFAULT_USER.username || user.password !== DEFAULT_USER.password) {
                response.writeHead(401)
                response.write('Login Fail')

                return response.end()
            }

            response.write('Login has sucessfully')
            return response.end()
        }
    },

    default: (request, response) => {
        response.write('Hello World!')
        return response.end()
    }
}

const handler = (request, response) => {
    const {url, method} = request

    const routeKey = `${url}:${method.toLowerCase()}`

    const chosen = routes[routeKey] || routes.default
    response.writeHead(200, {
        'Content-Type': 'text/html'
    })

    return chosen(request, response)
}

const app = http.createServer(handler).listen(3333, () => console.log('Server is running ✨'))

module.exports = app