import React from 'react'
import { Button, Modal } from 'react-bootstrap'
import { deleteToDo } from 'util/toDoApi'

type CompleteToDoModalProps = {
  modalIsOpen: boolean
  id: string
  title: string
  closeModal: () => void
}

function CompleteToDoModal(props: CompleteToDoModalProps) {
  function complete() {
    deleteToDo(props.id)
  }
  return (
    <Modal show={props.modalIsOpen} onHide={props.closeModal}>
      <Modal.Header closeButton>
        <Modal.Title>確認</Modal.Title>
      </Modal.Header>
      <Modal.Body>{props.title}を完了しますか？</Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={complete}>
          完了！
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default CompleteToDoModal
