import React from 'react'
import { Button, Card } from 'react-bootstrap'

import './ToDoCard.css'

type ToDoCardProps = {
  id: string
  title: string
  deadline: string
  memo: string
  openModalFunc: (id: string, title: string) => void
}

function ToDoCard(props: ToDoCardProps) {
  return (
    <Card>
      <Card.Body>
        <Card.Title>{props.title}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">
          期限:{props.deadline}
        </Card.Subtitle>
        <Card.Text>{props.memo}</Card.Text>
        {/* ToDo完了確認モーダル(#askCompleteToDoModal)を表示するボタン */}
        <Button
          variant="primary"
          onClick={() => {
            props.openModalFunc(props.id, props.title)
          }}
        >
          完了！
        </Button>
      </Card.Body>
    </Card>
  )
}

export default ToDoCard
