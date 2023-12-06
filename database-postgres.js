import { randomUUID } from "node:crypto"
import { sql } from './db.js'
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

export class DatabasePostgres{
    async listUser(search) {
        let usuario

        if (search) {
            usuario = await sql `select * from usuarios where nome ilike ${'%' + search + '%'}`
        } else {
            usuario = await sql `select * from usuarios`
        }

        return usuario
    }

    async createUser(usuario) {
        const userId = randomUUID()
        const { nome, email, senha } = usuario
        const hashedPassword = await bcrypt.hash(senha, 10);

        await sql `insert into usuarios (id, nome, email, senha) VALUES (${userId}, ${nome}, ${email}, ${hashedPassword})`
    }

    async updateUser(id, usuario) {
        const { nome, email, senha } = usuario

        await sql`update usuarios set nome = ${nome}, email = ${email}, senha = ${senha} WHERE id = ${id}`
    }

    async deleteUser(id) {
        await sql `delete from usuarios where id = ${id}`
    }

    async listCategoria(search) {
        let categoria
    
        if (search) {
            categoria = await sql `select * from categoria where nome ilike ${'%' + search + '%'}`
        } else {
            categoria = await sql `select * from categoria`
        }
    
        return categoria
    }
    

    async createCategoria(categoria) {
        const { nome } = categoria
        if (!nome) {
            throw new Error('Nome da categoria não foi fornecido');
        }
        await sql `insert into categoria (nome) VALUES (${nome})`
    }

    async deleteCategoria(id) {
        await sql `delete from categoria where id = ${id}`
    }

    async listProd(search) {
        let produtos

        if (search) {
            produtos = await sql `select * from produtos where nome ilike ${'%' + search + '%'}`
        } else {
            produtos = await sql `select * from produtos`
        }

        return produtos
    }

    async createProd(produto) {
        const { nome, description, preco, categoriaId } = produto
        await sql `insert into produtos (nome, description, preco, categoriaId) VALUES (${nome}, ${description}, ${preco}, ${categoriaId})`
    } catch (error) {
        console.error("Erro ao criar produto:", error);
        throw error; 
    }

    async updateProd(id, produto) {
        const { nome, description, preco, categoriaId } = produto

        await sql`update produtos set nome = ${nome}, description = ${description}, preco = ${preco}, categoriaId = ${categoriaId} WHERE id = ${id}`
    }

    async deleteProd(id) {
        await sql `delete from produtos where id = ${id}`
    }
    async authenticateUser(email, senha) {
        try {
            const query = sql`SELECT id, senha FROM usuarios WHERE email = ${email}`;
            const result = await query;
    
            if (result && result.length > 0) {
                const storedPassword = result[0].senha;
    
                // Comparação da senha fornecida com o hash armazenado usando bcrypt
                const match = await bcrypt.compare(senha, storedPassword);
    
                if (match) {
                    const token = jwt.sign({ userId: result[0].id }, 'suaChaveSecreta');
                    return token;
                }
            }
    
            return null;
        } catch (error) {
            throw new Error('Erro durante a autenticação');
        }
    }
    
}
