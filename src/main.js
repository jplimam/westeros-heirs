const express = require('express');
const rotas = require('./routes');
const pkg = require('pg');

const { Pool } = pkg;

const user = 'postgres';
const password = 'postgres';
const host = 'localhost';
const port = 5432;
const database = 'westeros_heirs'

const connection = new Pool({
    user: 'postgres',
    password: 'postgres',
    host: 'localhost',
    port: 5432,
    database: 'westeros_heirs'
});

const app = express();
app.use(express.json());

app.get('/characters', async (req, res) => {
    const characters = await connection.query('SELECT * FROM characters;');
    console.log(characters);
    res.send(characters.rows);
})

app.get('/characters/:idCharacter', async (req, res) => {
    const { idCharacter } = req.params;

    const character = await connection.query('SELECT * FROM characters WHERE id = $1;', [idCharacter]);


    console.log(character);
    res.send(character.rows[0]);
});

app.post('/characters', (req, res) => {
    const { name, house, series, dead, gender } = req.body;

    connection.query('INSERT INTO characters (name, house, series, dead, gender) VALUES ($1, $2, $3, $4, $5);', [name, house, series, dead, gender]
    );

    res.send('Ok');
});

app.use(rotas);

app.listen(3000, () => {
    console.log('Running on localhost:3000');
});
