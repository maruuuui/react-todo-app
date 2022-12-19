import React, { useEffect, useState } from 'react'
import 'pages/App/index.css'
import ToDoCard from 'pages/App/components/ToDoCard'

type ToDo = {
  id: string
  title: string
  deadline: string
  memo: string
}

function App() {
  const openModalFunc = (id: string, title: string) => {
    console.log(`id:${id}, title:${title} の完了確認モーダルを開く`)
  }
  const [toDoDataArray, setToDoDataArray] = useState<ToDo[]>([])
  const [shouldFetchToDoData, setShouldFetchToDoData] = useState<boolean>(true)

  function fetchToDoDataArray() {
    setToDoDataArray([
      {
        id: 'hogehoge',
        title: 'タイトル',
        deadline: '2022/12/12 00:00',
        memo: 'メモメモ',
      },
    ])
    // バックエンド(lambda)からToDoを取得する
  }
  useEffect(() => {
    if (shouldFetchToDoData) {
      fetchToDoDataArray()
    }
    setShouldFetchToDoData(false)
  }, [shouldFetchToDoData])

  return (
    <div className="App">
      <div className="minigrid-cards">
        {toDoDataArray.map((toDoData, i) => {
          return (
            <ToDoCard
              key={i}
              id={toDoData.id}
              title={toDoData.title}
              deadline={toDoData.deadline}
              memo={toDoData.memo}
              openModalFunc={openModalFunc}
            />
          )
        })}
      </div>
    </div>
  )
}

export default App
