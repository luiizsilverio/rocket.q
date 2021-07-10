const Database = require("../db/config")

module.exports = {
   async create(req, res) {
      const db = await Database()
      const password = req.body.password
      let room = ''

      for (var i = 0; i < 6; i++) {
         room += Math.floor(Math.random() * 10).toString()
      }

      await db.run(`
         INSERT INTO rooms (
            id,
            password
         ) VALUES (
            ${ parseInt(room) },
            ${ password }
         )
      `)

      await db.close()

      res.redirect(`/room/${room}`)
   }
}