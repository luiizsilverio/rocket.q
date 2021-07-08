const modalWrapper = document.querySelector('.modal-wrapper')
const cancelButton = document.querySelector('.modal .cancel')

const Modal = {
  open() {
    modalWrapper.classList.add('active')    
  },
  close() {
    modalWrapper.classList.remove('active')
  }
}

cancelButton.addEventListener('click', event => {
  Modal.close()
})

export default Modal