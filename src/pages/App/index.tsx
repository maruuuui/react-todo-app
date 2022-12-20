import React, { useEffect, useState } from 'react'
import 'pages/App/index.css'
import { Container, Row, Col } from 'react-bootstrap'

import ToDoCard from 'pages/App/components/ToDoCard'
import CompleteToDoModal from 'components/CompleteToDoModal'

import { ToDo } from 'types'
import { getToDoDataArray } from 'util/toDoApi'

function App() {
  const [modalIsOpen, setIsOpen] = useState<boolean>(false)
  const [modalContentId, setModalContentId] = useState<string>('')
  const [modalContentTitle, setModalContentTitle] = useState<string>('')

  const openModalFunc = (id: string, title: string) => {
    console.log(`id:${id}, title:${title} の完了確認モーダルを開く`)
    setModalContentId(id)
    setModalContentTitle(title)
    setIsOpen(true)
  }
  const closeModalFunc = () => {
    setIsOpen(false)
  }
  const [toDoDataArray, setToDoDataArray] = useState<ToDo[]>([])
  const [shouldFetchToDoData, setShouldFetchToDoData] = useState<boolean>(true)

  async function fetchToDoDataArray() {
    try {
      // テスト表示用データ
      // const result = [
      //   {
      //     id: 'hogehoge',
      //     title: 'タイトル',
      //     deadline: '2022/12/12 00:00',
      //     memo: 'メモメモ',
      //   },
      // ]

      // バックエンド(lambda)からToDoを取得する
      const result = await getToDoDataArray()
      setToDoDataArray(result)
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    if (shouldFetchToDoData) {
      fetchToDoDataArray()
    }
    setShouldFetchToDoData(false)
  }, [shouldFetchToDoData])

  return (
    <>
      <Container fluid>
        <Row>
          {toDoDataArray.map((toDoData, i) => {
            return (
              <Col xs={12} md={4} lg={3} key={i}>
                <ToDoCard
                  id={toDoData.id}
                  title={toDoData.title}
                  deadline={toDoData.deadline}
                  memo={toDoData.memo}
                  openModalFunc={openModalFunc}
                />
              </Col>
            )
          })}
        </Row>
      </Container>
      <CompleteToDoModal
        modalIsOpen={modalIsOpen}
        id={modalContentId}
        title={modalContentTitle}
        closeModal={closeModalFunc}
      />
    </>
  )
}

export default App
