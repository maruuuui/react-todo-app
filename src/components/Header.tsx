import React, { useState } from 'react'
import { Button, Container, Nav, Navbar } from 'react-bootstrap'

type HeaderProps = {
  openModal: () => void
  setShouldFetchToDoData: () => void
}
function Header(props: HeaderProps) {
  return (
    <Navbar bg="light">
      <Container fluid>
        <Navbar.Brand className="mb-0">ToDoアプリ</Navbar.Brand>
        <Nav.Item>
          <Button variant="success" onClick={props.openModal}>
            新規作成
          </Button>
        </Nav.Item>
      </Container>
    </Navbar>
  )
}

export default Header
