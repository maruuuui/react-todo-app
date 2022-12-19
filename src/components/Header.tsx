import React from 'react'

function Header() {
  return (
    <header>
      <nav className="navbar navbar-light bg-light">
        <div className="container-fluid">
          <span className="navbar-brand mb-0 h1">ToDoアプリ</span>
          {/* ToDo追加モーダル(#createToDoModal)を表示するボタン */}
          <button className="btn btn-success" id="openCreateToDoModal">
            新規作成
          </button>
        </div>
      </nav>
    </header>
  )
}

export default Header
