import React from 'react'
import { Button, Modal } from 'react-bootstrap'
import { deleteToDo } from 'util/toDoApi'

type CompleteToDoModalProps = {
  completeToDoModalIsOpen: boolean
  id: string
  title: string
  closeModal: () => void
  setShouldFetchToDoData: () => void
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>
}

function CompleteToDoModal(props: CompleteToDoModalProps) {
  const complete = async () => {
    props.setIsLoading(true)
    await deleteToDo(props.id)
    props.setIsLoading(false)

    props.setShouldFetchToDoData()
    props.closeModal()
  }
  return (
    <Modal show={props.completeToDoModalIsOpen} onHide={props.closeModal}>
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
