import { Container, Row, Col } from 'react-bootstrap'
import ToDoCard from 'pages/App/components/ToDoCard'
import { ToDo } from 'types'

type ToDoCardsProps = {
  toDoDataArray: ToDo[]
  openModalFunc: (id: string, title: string) => void
}

function ToDoCards(props: ToDoCardsProps) {
  return (
    <>
      <Container fluid>
        <Row>
          {props.toDoDataArray.map((toDoData, i) => {
            return (
              <Col xs={12} md={4} lg={3} key={i}>
                <ToDoCard
                  id={toDoData.id}
                  title={toDoData.title}
                  deadline={toDoData.deadline}
                  memo={toDoData.memo}
                  openModalFunc={props.openModalFunc}
                />
              </Col>
            )
          })}
        </Row>
      </Container>
    </>
  )
}

export default ToDoCards
