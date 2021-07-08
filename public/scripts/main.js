import Modal from './modal.js'

const checkButtons  = document.querySelectorAll('.actions .check')
const deleteButtons = document.querySelectorAll('.actions .delete')

checkButtons.forEach(button => (
  button.addEventListener('click', event => {
    Modal.open()
  })
))

deleteButtons.forEach(button => (
  button.addEventListener('click', event => {
    Modal.open()
  })
))

1:29
