import 'pages/Calendar/ToDoCalendar.css'

import React, { useEffect, useState } from 'react'
import { Container, Row, Col, Button } from 'react-bootstrap'

import Date from 'pages/Calendar/components/Date'
import { ToDo } from 'types'
import moment, { Moment } from 'moment'

type ToDoCardsProps = {
  toDoDataArray: ToDo[]
  openModalFunc: (id: string, title: string) => void
}

function ToDoCards(props: ToDoCardsProps) {
  const [now, setNow] = useState<Moment>(moment())
  const [year, setYear] = useState<number>(now.year())
  const [month, setMonth] = useState<number>(now.month())

  return (
    <>
      <Container fluid className="calendar">
        <Row>
          <Col sm={2}>
            <Button
              onClick={() => {
                setNow(now.subtract(1, 'months'))
                setYear(now.year())
                setMonth(now.month())
              }}
            >
              前の月へ
            </Button>
          </Col>
          <Col sm={8} style={{ textAlign: 'center' }}>
            <h1>{now.format('YYYY年MM月')}</h1>
          </Col>
          <Col sm={2} style={{ textAlign: 'right' }}>
            <Button
              onClick={() => {
                setNow(now.add(1, 'months'))
                setYear(now.year())
                setMonth(now.month())
              }}
            >
              次の月へ
            </Button>
          </Col>
        </Row>
        <Row>
          <Col className="calendarHead" style={{ color: 'red' }}>
            日
          </Col>

          {['月', '火', '水', '木', '金'].map((day) => {
            return (
              <Col className="calendarHead" key={day}>
                {day}
              </Col>
            )
          })}
          <Col className="calendarHead" style={{ color: 'blue' }}>
            土
          </Col>
        </Row>
        {[1, 2, 3, 4, 5, 6].map((row) => {
          return (
            <Row key={`row ${row}`}>
              {[1, 2, 3, 4, 5, 6, 7].map((col) => {
                return (
                  <Col key={`col ${row} ${col}`} className="calendarDay">
                    <Date
                      now={now}
                      row={row}
                      col={col}
                      toDoDataArray={props.toDoDataArray}
                      openModalFunc={props.openModalFunc}
                      key={`date ${row} ${col}`}
                    />
                  </Col>
                )
              })}
            </Row>
          )
        })}
      </Container>
    </>
  )
}

export default ToDoCards
