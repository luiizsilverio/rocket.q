const Database = require('../db/config')

module.exports = {   
   async index(req, res) {
      const db = await Database()
      const { room, question, action } = req.params
      const password = req.body.password
        
      const theRoom = await db.get(`SELECT * FROM rooms WHERE id = ${room}`)

      if (theRoom && theRoom.password === password) {
         if (action === "delete") {
            await db.run(`DELETE FROM questions WHERE id = ${question}`)
         } 
         else if (action === "check") {
            await db.run(`
               UPDATE questions SET read = 1 
               WHERE id = ${question}
            `)
         }
      }

      await db.close()
      res.redirect(`/room/${room}`)
   },
   
   async create(req, res) {
      const db = await Database()
      const { question } = req.body
      const { room } = req.params

      await db.run(`
         INSERT INTO questions (
            title, room, read
         ) VALUES (
            "${ question }",
            ${ room },
            0
         )
      `)

      await db.close()      
      res.redirect(`/room/${room}`)
   }
}