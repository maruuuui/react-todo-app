import React, { useState } from 'react'
import moment, { Moment } from 'moment'
import TextField from '@mui/material/TextField'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment'
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker'
import { Button, Form, Modal } from 'react-bootstrap'
import { createToDo } from 'util/toDoApi'

type CreateToDoModalProps = {
  modalIsOpen: boolean
  closeModal: () => void
  setShouldFetchToDoData: () => void
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>
}

function CreateToDoModal(props: CreateToDoModalProps) {
  const [title, settitle] = useState<string>('')
  const [memo, setMemo] = useState<string>('')

  const [deadline, setDeadline] = useState<Moment | null>(moment())
  const handleDeadlineChange = (newValue: Moment | null) => {
    setDeadline(newValue)
  }

  const post = async () => {
    console.log('ToDo追加ボタンが押下されたよ')
    var forms = document.querySelectorAll('.needs-validation')

    // バリデーションが通ったらPOSTして、ToDo新規作成モーダルを閉じる
    let validated = true
    Array.prototype.slice.call(forms).forEach(function (form) {
      if (!form.checkValidity()) {
        validated = false
      }

      form.classList.add('was-validated')
    })

    if (validated && deadline !== null && deadline.isValid()) {
      props.setIsLoading(true)
      await createToDo(title, memo, deadline)
      props.setIsLoading(false)

      props.setShouldFetchToDoData()
      props.closeModal()
    }
  }
  return (
    <Modal show={props.modalIsOpen} onHide={props.closeModal}>
      <Modal.Header closeButton>
        <Modal.Title>ToDo追加フォーム</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form className="needs-validation" noValidate>
          <Form.Group className="title mb-3">
            <Form.Label>タイトル</Form.Label>
            <Form.Control
              type="text"
              id="titleInput"
              onChange={(event) => {
                settitle(event.currentTarget.value)
              }}
              required
            />
            <Form.Control.Feedback type="invalid">
              この項目は必須です。
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="memo mb-3">
            <Form.Label>備考</Form.Label>
            <Form.Control
              as="textarea"
              id="memoTextarea"
              onChange={(event) => {
                setMemo(event.currentTarget.value)
              }}
            />
          </Form.Group>
          <Form.Group className="deadline mb-3">
            <Form.Label>締め切り日時</Form.Label>
            <div
              className="input-group"
              id="deadlineDatetimepicker"
              data-td-target-input="nearest"
              data-td-target-toggle="nearest"
            >
              <LocalizationProvider dateAdapter={AdapterMoment}>
                <DateTimePicker
                  className="form-control"
                  value={deadline}
                  onChange={handleDeadlineChange}
                  renderInput={(params) => <TextField {...params} />}
                  inputFormat="YYYY/MM/DD HH:mm"
                />
              </LocalizationProvider>
            </div>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={post}>
          ToDo追加
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default CreateToDoModal
