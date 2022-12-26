import React, { useEffect, useState } from 'react'
import 'pages/App/index.css'

import Layout from 'components/Layout'
import ToDoCalendar from 'pages/Calendar/ToDoCalendar'

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
      <Layout
        setShouldFetchTrue={setShouldFetchTrue}
        isLoading={isLoading}
        setIsLoading={setIsLoading}
        completeToDoModalIsOpen={completeToDoModalIsOpen}
        setCompleteToDoModalIsOpen={setCompleteToDoModalIsOpen}
        modalContentId={modalContentId}
        modalContentTitle={modalContentTitle}
        createToDoModalIsOpen={createToDoModalIsOpen}
        setCreateToDoModalIsOpen={setCreateToDoModalIsOpen}
        children={
          <ToDoCalendar
            toDoDataArray={toDoDataArray}
            openModalFunc={openModalFunc}
          />
        }
      />
    </>
  )
}

export default App
