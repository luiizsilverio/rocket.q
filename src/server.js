const express = require('express')
const cowsay = require('cowsay')

const server = express()

server.listen(3000, () => {
  console.log(
    cowsay.say({text: 'Servidor rodando na porta 3000'})
  )
})