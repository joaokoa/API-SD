import { sql } from './db.js'

 /*sql `DROP TABLE IF EXISTS produtos, categoria, usuarios`.then(() => {
     console.log('Tabelas apagadas!')
})
*/

/*
sql `
CREATE TABLE usuarios (
    id TEXT PRIMARY KEY,
    nome VARCHAR(50) NOT NULL,
    email TEXT NOT NULL,
    senha TEXT NOT NULL
 )`.then(() => {
    console.log('Tabela usuarios criada!')
})
*/


 /*
 sql `CREATE TABLE categoria (
     id SERIAL PRIMARY KEY,
     nome VARCHAR(20) NOT NULL
 )`.then(() => {
    console.log('Tabela categoria criada!')
})
*/

/*
 sql `CREATE TABLE produtos (
     id SERIAL PRIMARY KEY,
     nome VARCHAR(40) NOT NULL,
     description VARCHAR(150),
     preco DECIMAL(7,2) NOT NULL,
     categoriaId INTEGER NOT NULL,
     FOREIGN KEY(categoriaId) REFERENCES categoria(id)
 )`.then(() => {
    console.log('Tabela produtos criada!')
})
*/
