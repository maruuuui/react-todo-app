import React, { useState } from 'react'
import Modal from 'react-modal'

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
  createToDo: (title: string, memo: string, deadline: string) => void
}

Modal.setAppElement('body') // bodyなど任意の要素に変更OK

function CreateToDoModal(props: CreateToDoModalProps) {
  function tmp() {
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
    if (validated) {
      props.createToDo('hoge', 'hoge', 'hoge')
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
              required
            />
            <div className="invalid-feedback"> この項目は必須です。 </div>
          </div>
          <div className="memo mb-3">
            <label htmlFor="memoTextarea" className="form-label">
              備考
            </label>
            <textarea className="form-control" id="memoTextarea"></textarea>
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
              <input
                id="deadlineDatetimepickerInput"
                type="text"
                className="form-control"
                data-td-target="#deadlineDatetimepicker"
                required
              />
              <span
                className="input-group-text"
                data-td-target="#deadlineDatetimepicker"
                data-td-toggle="datetimepicker"
              >
                <span className="fa-solid fa-calendar"></span>
              </span>
              <div className="invalid-feedback"> この項目は必須です。 </div>
            </div>
          </div>
        </form>
      </div>
      <div className="modal-footer">
        <button type="button" className="btn btn-primary" onClick={tmp}>
          ToDo追加
        </button>
      </div>
    </Modal>
  )
}

export default CreateToDoModal
