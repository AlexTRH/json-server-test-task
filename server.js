import jsonServer from 'json-server';

const server = jsonServer.create();
const router = jsonServer.router('data/db.json')
server.use(router)

// This part is what I am looking for
const customRouter = jsonServer.customRouter('data/routes.json')
server.use(customRouter)

server.listen(3000, () => {
    console.log('JSON Server is running')
})
