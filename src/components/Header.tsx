import React, { useState } from 'react'
import { Button, Container, Nav, Navbar } from 'react-bootstrap'

type HeaderProps = {
  openModal: () => void
  setShouldFetchToDoData: () => void
}
function Header(props: HeaderProps) {
  const path = window.location.pathname
  return (
    <Navbar bg="light">
      <Container fluid>
        <Navbar.Brand className="mb-0">ToDoアプリ</Navbar.Brand>
        <Nav className="me-auto" variant="tabs" defaultActiveKey={path}>
          <Nav.Link href="/">一覧表示</Nav.Link>
          <Nav.Link href="/calendar">カレンダー表示</Nav.Link>
        </Nav>
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
