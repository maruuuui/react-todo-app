import React from 'react'
import './ToDoCard.css'

type ToDoCardProps = {
  id: string
  title: string
  deadline: string
  memo: string
  openModalFunc: (id: string, title: string) => void
}

function ToDoCard(props: ToDoCardProps) {
  const id = props.id
  const title = props.title
  const deadline = props.deadline
  const memo = props.memo

  function onCompleteToDoModalButtonClick() {
    props.openModalFunc(id, title)
  }

  return (
    <div className="minigrid-card">
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">{title}</h5>
          <h6 className="card-subtitle mb-2 text-muted">期限:{deadline}</h6>
          <p className="card-text">{memo}</p>
          {/* ToDo完了確認モーダル(#askCompleteToDoModal)を表示するボタン */}
          <button
            onClick={onCompleteToDoModalButtonClick}
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
