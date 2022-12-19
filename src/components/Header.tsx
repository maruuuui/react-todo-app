import React, { useState } from 'react'
import moment, { Moment } from 'moment'

import CreateToDoModal from 'components/CreateToDoModal'

function Header() {
  const [modalIsOpen, setIsOpen] = useState<boolean>(false)

  function openModal() {
    setIsOpen(true)
  }

  function closeModal() {
    setIsOpen(false)
  }

  function createToDo(title: string, memo: string, deadline: Moment) {
    console.log(`title:${title},memo:${memo},deadline:${deadline}`)
  }

  return (
    <header>
      <nav className="navbar navbar-light bg-light">
        <div className="container-fluid">
          <span className="navbar-brand mb-0 h1">ToDoアプリ</span>
          {/* ToDo追加モーダル(#createToDoModal)を表示するボタン */}
          <button className="btn btn-success" onClick={openModal}>
            新規作成
          </button>
          <CreateToDoModal
            modalIsOpen={modalIsOpen}
            closeModal={closeModal}
            createToDo={createToDo}
          />
        </div>
      </nav>
    </header>
  )
}

export default Header
