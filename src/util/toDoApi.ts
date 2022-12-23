import axios from 'axios'
import { Moment } from 'moment'
import { ToDo } from 'types'

// デプロイ時にはawsのurlに差し替える
const url =
  typeof process.env.REACT_APP_BACKEND_HOST == 'string'
    ? process.env.REACT_APP_BACKEND_HOST
    : 'http://localhost:8000'
const requestHeader = {
  'Content-Type': 'application/json',
}

export async function getToDoDataArray() {
  try {
    const res = await axios.get<ToDo[]>(url)
    if (res.status !== 200) {
      throw Error('ToDoの取得に失敗しました')
    }

    const items = res.data
    // for (const item of items) {
    //     console.log(`id:${item.id}`)
    // }
    return items
  } catch (err) {
    console.log(err)
    throw Error('ToDoの取得に失敗しました')
  }
}

export async function createToDo(
  title: string,
  memo: string,
  deadline: Moment,
) {
  console.log(`createToDo title:${title},memo:${memo},deadline:${deadline}`)
  try {
    const res = await axios.post(
      url,
      {
        title,
        memo,
        deadline: deadline.format('YYYY/MM/DD HH:mm:ss'),
      },
      { headers: requestHeader },
    )
    if (res.status !== 200) {
      throw Error('ToDoの作成に失敗しました')
    }

    return res
  } catch (err) {
    console.log(err)
    throw Error('ToDoの作成に失敗しました')
  }
}

export async function deleteToDo(id: string) {
  console.log(`deleteToDo id:${id}`)
  try {
    const res = await axios.delete(`${url}/${id}`, { headers: requestHeader })
    if (res.status !== 200) {
      throw Error('ToDoの削除に失敗しました')
    }

    return res
  } catch (err) {
    console.log(err)
    throw Error('ToDoの削除に失敗しました')
  }
}
