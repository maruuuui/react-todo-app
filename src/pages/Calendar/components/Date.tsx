import moment, { Moment } from 'moment'
import { Col } from 'react-bootstrap'
import { ToDo } from 'types'

import ToDoDetail from 'pages/Calendar/components/ToDoDetail'

type DateProps = {
  now: Moment
  row: number
  col: number
  toDoDataArray: ToDo[]
  openModalFunc: (id: string, title: string) => void
}
function Date(props: DateProps) {
  // 月初の曜日を表す数値 日曜:0 土曜:6
  const offset = props.now.startOf('month').weekday()
  // この月が何日まであるか
  const daysOfMonth = moment(props.now)
    .add(1, 'months')
    .startOf('month')
    .subtract(1, 'days')
    .daysInMonth()

  const index = 7 * (props.row - 1) + props.col
  const dayOfMonth = index - offset
  const today = moment(props.now).set('date', dayOfMonth)

  const isThisMonth = () => {
    if (dayOfMonth <= 0 || daysOfMonth < dayOfMonth) {
      return false
    }
    return true
  }

  // 月初の曜日を考慮して、自身が何日かを表す箇所
  const getTodayOfMonth = () => {
    if (!isThisMonth()) {
      return <></>
    }
    return (
      <>
        {dayOfMonth}
        <br />
      </>
    )
  }

  const getTodayToDo = () => {
    if (!isThisMonth()) {
      return []
    }
    // 表示中の年
    const thisYear = props.now.year()
    // 表示中の月
    const thisMonth = props.now.month()

    let toDoArray: ToDo[] = []
    props.toDoDataArray.forEach((toDo) => {
      const deadline = moment(toDo.deadline, 'YYYY/MM/DD HH:mm:ss')
      const deadlineYear = deadline.year()
      const deadlineMonth = deadline.month()
      const deadlineDay = deadline.date()

      if (
        thisYear == deadlineYear &&
        thisMonth == deadlineMonth &&
        dayOfMonth == deadlineDay
      ) {
        toDoArray.push(toDo)
      }
    })

    return toDoArray
  }

  return (
    <>
      <Col>
        <>
          {getTodayOfMonth()}
          {getTodayToDo().map((toDo) => {
            return (
              <ToDoDetail
                id={toDo.id}
                title={toDo.title}
                memo={toDo.memo}
                deadline={toDo.deadline}
                openModalFunc={props.openModalFunc}
                key={toDo.id}
              />
            )
          })}
        </>
      </Col>
    </>
  )
}

export default Date
