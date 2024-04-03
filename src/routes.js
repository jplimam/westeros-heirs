const express = require('express');

const rotas = express();

rotas.get('/status', (req, res) => {
    res.send('Ok');
});
rotas.get('/characters', (req, res) => {
    const characters = connection.query('SELECT * FROM characters;');
    console.log(characters);
    res.send(characters);
})

module.exports = rotas;