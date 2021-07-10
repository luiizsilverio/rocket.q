module.exports = {
   create(req, res) {
      let room = 123455
      res.redirect(`/room/${room}`)
   }
}