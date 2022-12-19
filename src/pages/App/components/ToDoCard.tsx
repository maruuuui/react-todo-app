import React from 'react'

function ToDoCard() {
  const title = 'タイトル'
  const deadline = '2022/12/12 00:00'
  const memo = 'メモメモ'
  return (
    <div className="minigrid-card">
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">{title}</h5>
          <h6 className="card-subtitle mb-2 text-muted">期限:{deadline}</h6>
          <p className="card-text">{memo}</p>
          {/* ToDo完了確認モーダル(#askCompleteToDoModal)を表示するボタン */}
          <button
            value="{{.ID}},{{.Title}}"
            className="btn btn-primary askCompleteToDoModalButton"
          >
            完了！
          </button>
        </div>
      </div>
    </div>
  )
}

export default ToDoCard
