import axios from 'axios'
import { ToDo } from 'types'

// デプロイ時にはawsのurlに差し替える
const url =
  typeof process.env.REACT_APP_BACKEND_HOST == 'string'
    ? process.env.REACT_APP_BACKEND_HOST
    : 'http://localhost:8000'
const accessControlAllowOrigin =
  typeof process.env.REACT_APP_ORIGIN == 'string'
    ? process.env.REACT_APP_ORIGIN
    : 'http://localhost:3000'

export async function getToDoDataArray() {
  let requestHeader = {
    //   "Access-Control-Allow-Origin": accessControlAllowOrigin,
  }
  try {
    const res = await axios.get<ToDo[]>(url, { headers: requestHeader })
    if (res.status !== 200) {
      throw Error('ToDoの取得に失敗しました')
    }

    const items = res.data
    for (const item of items) {
      console.log(`id:${item.id}`)
    }
    return items
  } catch (err) {
    console.log(err)
    throw Error('ToDoの取得に失敗しました')
  }
}
