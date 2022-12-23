import React, { useEffect, useState } from 'react'
import 'pages/App/index.css'
import { Container, Row, Col } from 'react-bootstrap'

import Header from 'components/Header'
import ToDoCard from 'pages/App/components/ToDoCard'
import CompleteToDoModal from 'components/CompleteToDoModal'
import CreateToDoModal from 'components/CreateToDoModal'
import LoadingModal from 'components/LoadingModal'

import { ToDo } from 'types'
import { getToDoDataArray } from 'util/toDoApi'

function App() {
  // ToDo自体のデータ
  const [toDoDataArray, setToDoDataArray] = useState<ToDo[]>([])
  const [shouldFetchToDoData, setShouldFetchToDoData] = useState<boolean>(true)

  const setShouldFetchTrue = () => {
    setShouldFetchToDoData(true)
  }

  const fetchToDoDataArray = async () => {
    try {
      // バックエンド(lambda)からToDoを取得する
      const result = await getToDoDataArray()
      setToDoDataArray(result)
    } catch (error) {
      console.log(error)
    }
  }

  // ToDo完了確認モーダル関係
  const [completeToDoModalIsOpen, setCompleteToDoModalIsOpen] =
    useState<boolean>(false)
  const [modalContentId, setModalContentId] = useState<string>('')
  const [modalContentTitle, setModalContentTitle] = useState<string>('')

  const openModalFunc = (id: string, title: string) => {
    console.log(`id:${id}, title:${title} の完了確認モーダルを開く`)
    setModalContentId(id)
    setModalContentTitle(title)
    setCompleteToDoModalIsOpen(true)
  }

  // ToDo新規作成モーダル関係
  const [createToDoModalIsOpen, setCreateToDoModalIsOpen] =
    useState<boolean>(false)

  // ローディング画面関係
  const [isLoading, setIsLoading] = useState<boolean>(false)

  useEffect(() => {
    if (shouldFetchToDoData) {
      setIsLoading(true)
      fetchToDoDataArray().then(() => {
        setIsLoading(false)
        setShouldFetchToDoData(false)
      })
    }
  }, [shouldFetchToDoData])

  return (
    <>
      <Header
        setShouldFetchToDoData={setShouldFetchTrue}
        openModal={() => {
          setCreateToDoModalIsOpen(true)
        }}
      />
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
        completeToDoModalIsOpen={completeToDoModalIsOpen}
        id={modalContentId}
        title={modalContentTitle}
        closeModal={() => {
          setCompleteToDoModalIsOpen(false)
        }}
        setShouldFetchToDoData={setShouldFetchTrue}
        setIsLoading={setIsLoading}
      />
      <CreateToDoModal
        modalIsOpen={createToDoModalIsOpen}
        closeModal={() => {
          setCreateToDoModalIsOpen(false)
        }}
        setShouldFetchToDoData={() => {
          setShouldFetchToDoData(true)
        }}
        setIsLoading={setIsLoading}
      />
      <LoadingModal isLoading={isLoading} />
    </>
  )
}

export default App
