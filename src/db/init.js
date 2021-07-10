const Database = require("./config")

const initDb = {
   async init() {
      const db = await Database() // Abre o BD

      await db.exec(`
         CREATE TABLE rooms (
            id INTEGER PRIMARY KEY,
            password TEXT
         )
      `)

      await db.exec(`
         CREATE TABLE questions (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT,
            read INT,
            room INT
         )
      `)

      await db.close() // Fecha o BD
   }
}

initDb.init()