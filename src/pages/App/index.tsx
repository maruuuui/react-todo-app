import React from 'react'
import 'pages/App/index.css'
import ToDoCard from 'pages/App/components/ToDoCard'

function App() {
  const id = 'hogehoge'
  const title = 'タイトル'
  const deadline = '2022/12/12 00:00'
  const memo = 'メモメモ'
  const openModalFunc = () => {
    alert('押されたよ')
  }

  return (
    <div className="App">
      <div className="minigrid-cards">
        <ToDoCard
          id={id}
          title={title}
          deadline={deadline}
          memo={memo}
          openModalFunc={openModalFunc}
        />
      </div>
    </div>
  )
}

export default App
