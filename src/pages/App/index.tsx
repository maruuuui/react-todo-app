import React from 'react'
import 'pages/App/index.css'
import ToDoCard from 'pages/App/components/ToDoCard'

function App() {
  const numbers = [1, 2, 3, 4, 5]
  function listItems() {
    return numbers.map((number) => <li>{number}</li>)
  }
  const items = listItems()
  return (
    <div className="App">
      <ToDoCard />
    </div>
  )
}

export default App
