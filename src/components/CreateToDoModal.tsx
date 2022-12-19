import React, { useState } from 'react'
import Modal from 'react-modal'
import moment, { Moment } from 'moment'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import TextField from '@mui/material/TextField'
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment'

import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker'

const customStyles = {
  content: {
    width: '70%',
    maxWidth: '500px',
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
}

type CreateToDoModalProps = {
  modalIsOpen: boolean
  closeModal: () => void
  createToDo: (title: string, memo: string, deadline: Moment) => void
}

Modal.setAppElement('body') // 'react-modal'の処理

function CreateToDoModal(props: CreateToDoModalProps) {
  const [title, settitle] = useState<string>('')
  const handleTitleInput = (event: React.FormEvent<HTMLInputElement>) => {
    settitle(event.currentTarget.value)
  }
  const [memo, setMemo] = useState<string>('')
  const handleMemoInput = (event: React.FormEvent<HTMLTextAreaElement>) => {
    setMemo(event.currentTarget.value)
  }

  const [deadline, setDeadline] = useState<Moment | null>(moment())
  const handleDeadlineChange = (newValue: Moment | null) => {
    setDeadline(newValue)
  }

  function post() {
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
      props.createToDo(title, memo, deadline)
    }
  }
  return (
    <Modal
      contentLabel="Example Modal"
      isOpen={props.modalIsOpen}
      style={customStyles}
      onRequestClose={props.closeModal}
    >
      <div className="modal-header">
        <h5 className="modal-title" id="createToDoModalLabel">
          ToDo追加フォーム
        </h5>
        <button
          type="button"
          className="btn-close"
          onClick={props.closeModal}
        ></button>
      </div>
      <div className="modal-body">
        <form className="needs-validation" noValidate>
          <div className="title mb-3">
            <label htmlFor="titleInput" className="form-label">
              タイトル
            </label>
            <input
              type="text"
              className="form-control"
              id="titleInput"
              onChange={handleTitleInput}
              required
            />
            <div className="invalid-feedback"> この項目は必須です。 </div>
          </div>
          <div className="memo mb-3">
            <label htmlFor="memoTextarea" className="form-label">
              備考
            </label>
            <textarea
              className="form-control"
              onChange={handleMemoInput}
              id="memoTextarea"
            ></textarea>
          </div>
          <div className="deadline mb-3">
            <label htmlFor="deadlineDatetimepickerInput" className="form-label">
              締め切り日時
            </label>
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

              <div className="invalid-feedback"> この項目は必須です。 </div>
            </div>
          </div>
        </form>
      </div>
      <div className="modal-footer">
        <button type="button" className="btn btn-primary" onClick={post}>
          ToDo追加
        </button>
      </div>
    </Modal>
  )
}

export default CreateToDoModal
