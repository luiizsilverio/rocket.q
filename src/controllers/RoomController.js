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

   async open(req, res) {
      const db = await Database()
      const roomId = req.params.room

      const questions = await db.all(`
         SELECT * FROM questions 
         WHERE room = ${ roomId } AND read = 0
      `)

      const read = await db.all(`
         SELECT * FROM questions
         WHERE room = ${ roomId } AND read = 1
      `)

      console.log(questions.length, read.length)
      const hasQuestions = (questions.length > 0) || (read.length > 0)

      await db.close()  
      res.render("room", { roomId, questions, read, hasQuestions })
   },

   enter(req, res) {
      const roomId = req.body.roomId

      res.redirect(`/room/${roomId}`)
   }
}