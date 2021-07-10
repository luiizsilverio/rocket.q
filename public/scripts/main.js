import Modal from './modal.js'

const checkButtons  = document.querySelectorAll('.actions .check')
const deleteButtons = document.querySelectorAll('.actions .delete')

const modalTitle = document.querySelector('.modal h2')
const modalDescription = document.querySelector('.modal p')
const modalButton = document.querySelector('.modal button')

function handleClick(event, deletar = false) {
  event.preventDefault()

  const action = deletar ? "delete" : "check"
  const roomId = document.getElementById("room-id").dataset.id
  const questionId = event.target.dataset.id
  
  const form = document.querySelector(".modal form")
  form.setAttribute("action", `/question/${roomId}/${questionId}/${action}`)
  
  if (deletar) {
    modalTitle.innerHTML = 'Excluir Pergunta'
    modalDescription.innerHTML = 'Tem certeza que deseja excluir esta pergunta?'
    modalButton.innerHTML = 'Sim, excluir'
    modalButton.classList.add("red")
  } else {
    modalTitle.innerHTML = 'Marcar como Lida'
    modalDescription.innerHTML = 'Tem certeza que deseja marcar como lida?'
    modalButton.innerHTML = 'Sim, marcar'
    modalButton.classList.remove("red")
  }
  Modal.open()
}

checkButtons.forEach(button => (
  button.addEventListener('click', event => 
    handleClick(event)    
  )
))

deleteButtons.forEach(button => (
  button.addEventListener('click', event => 
    handleClick(event, true)    
  )
))
