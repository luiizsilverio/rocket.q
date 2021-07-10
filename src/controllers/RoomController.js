const Database = require("../db/config")

function randomId() {
   let room = ''

   for (var i = 0; i < 6; i++) {
      room += Math.floor(Math.random() * 10).toString()
   }

   return room
}

module.exports = {
   async create(req, res) {
      const db = await Database()
      const password = req.body.password
      let roomId
      let achou
      
      // verifica se esse id já existe no BD
      do {
         roomId = randomId()

         const rooms = await db.all(`
            SELECT id FROM rooms WHERE id = ${parseInt(roomId)}
         `)

         achou = rooms.some(room => room.id === parseInt(roomId))
      } while (achou)

      // Insere na tabela
      await db.run(`
         INSERT INTO rooms (
            id,
            password
         ) VALUES (
            ${ parseInt(roomId) },
            ${ password }
         )
      `)

      await db.close()

      res.redirect(`/room/${roomId}`)
   },

   open(req, res) {
      const roomId = req.params.room

      res.render("room", {roomId})
   }
}