import 'pages/Calendar/components/ToDoDetail.css'

import React from 'react'
import { Button, Card, OverlayTrigger, Popover } from 'react-bootstrap'

type ToDoDetailProps = {
  id: string
  title: string
  deadline: string
  memo: string
  openModalFunc: (id: string, title: string) => void
}

function ToDoDetail(props: ToDoDetailProps) {
  return (
    <OverlayTrigger
      trigger="click"
      placement="bottom"
      overlay={
        <Popover>
          <Popover.Header as="h3">{props.title}</Popover.Header>
          <Popover.Body>
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
          </Popover.Body>
        </Popover>
      }
    >
      <Button variant="secondary">{props.title}</Button>
    </OverlayTrigger>
  )
}
export default ToDoDetail
