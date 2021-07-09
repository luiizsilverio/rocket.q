module.exports = {
   index(req, res) {
      const { room, question, action } = req.params
      const password = req.body.password

      console.log('room', room)
      console.log('question', question)
      console.log('action', action)
      console.log('password', password)
   }
}