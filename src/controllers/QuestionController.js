const Database = require('../db/config')

module.exports = {   
   index(req, res) {
      const { room, question, action } = req.params
      const password = req.body.password
  
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