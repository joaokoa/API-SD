import { fastify } from 'fastify'
import fastifyCors from 'fastify-cors';
//import { DatabaseMemory } from './database-memory.js'
import { DatabasePostgres } from './database-postgres.js'

const server = fastify()
//const database = new DatabaseMemory()
const database = new DatabasePostgres


server.post('/usuarios', async (request, reply) => {
   const { nome, email, senha} = request.body
   
    await database.createUser({
        nome,
        email,
        senha,
    })

    return reply.status(201).send()
})

server.get('/usuarios', async (request) => {
    const search = request.query.search
    
    const usuario = await database.listUser(search)

    return usuario
})

server.put('/usuarios/:id', async (request, reply) => {
    const userId = request.params.id
    const { nome, email, senha } = request.body

    await database.updateUser(userId, {
        nome,
        email,
        senha,
    })

    return reply.status(204).send()
})

server.delete('/usuarios/:id', async (request, reply) => {
    const userId = request.params.id

    await database.deleteUser(userId)

    return reply.status(204).send()
})

server.post('/categoria', async (request, reply) => {
    const { nome } = request.body
    
     await database.createCategoria({
         nome
     })
 
     return reply.status(201).send()
 })
 
 server.get('/categoria', async (request) => {
     const search = request.query.search
     
     const categoria = await database.listCategoria(search)
 
     return categoria
 })
 
 server.delete('/categoria/:id', async (request, reply) => {
     const categoriaId = request.params.id
 
     await database.deleteCategoria(categoriaId)
 
     return reply.status(204).send()
 })

server.post('/produtos', async (request, reply) => {
    const { nome, description, preco, categoriaId} = request.body
    
     await database.createProd({
         nome,
         description,
         preco,
         categoriaId,
     })
 
     return reply.status(201).send()
 })
 
 server.get('/produtos', async (request) => {
     const search = request.query.search
     
     const produto = await database.listProd(search)
 
     return produto
 })
 
 server.put('/produtos/:id', async (request, reply) => {
     const prodId = request.params.id
     const { nome, description, preco, categoriaId} = request.body
 
     await database.updateProd(prodId, {
         nome,
         description,
         preco,
         categoriaId,
     })
 
     return reply.status(204).send()
 })
 
 server.delete('/produtos/:id', async (request, reply) => {
     const prodId = request.params.id
 
     await database.deleteProd(prodId)
 
     return reply.status(204).send()
 })


 server.register(fastifyCors, {
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type'],
    credentials: true,
});

server.listen({
    host: '0.0.0.0',
    port: process.env.port ?? 3333,
})