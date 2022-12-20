import React, { useState } from 'react'
import { Button, Container, Nav, Navbar } from 'react-bootstrap'

import CreateToDoModal from 'components/CreateToDoModal'

function Header() {
  const [modalIsOpen, setIsOpen] = useState<boolean>(false)

  function openModal() {
    setIsOpen(true)
  }

  function closeModal() {
    setIsOpen(false)
  }

  return (
    <Navbar bg="light">
      <Container fluid>
        <Navbar.Brand className="mb-0">ToDoアプリ</Navbar.Brand>
        <Nav.Item>
          <Button variant="success" onClick={openModal}>
            新規作成
          </Button>
        </Nav.Item>
      </Container>
      <CreateToDoModal modalIsOpen={modalIsOpen} closeModal={closeModal} />
    </Navbar>
  )
}

export default Header
