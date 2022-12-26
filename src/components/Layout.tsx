import React, { ReactNode } from 'react'
import { Outlet } from 'react-router-dom'

import Header from 'components/Header'
import CompleteToDoModal from 'components/CompleteToDoModal'
import CreateToDoModal from 'components/CreateToDoModal'
import LoadingModal from 'components/LoadingModal'

type LayoutProps = {
  children: ReactNode

  setShouldFetchTrue: () => void

  isLoading: boolean
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>

  completeToDoModalIsOpen: boolean
  setCompleteToDoModalIsOpen: React.Dispatch<React.SetStateAction<boolean>>
  modalContentId: string
  modalContentTitle: string

  createToDoModalIsOpen: boolean
  setCreateToDoModalIsOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const Layout: React.FC<LayoutProps> = (props) => {
  return (
    <>
      <Header
        setShouldFetchToDoData={props.setShouldFetchTrue}
        openModal={() => {
          props.setCreateToDoModalIsOpen(true)
        }}
      />
      {props.children}

      <CompleteToDoModal
        completeToDoModalIsOpen={props.completeToDoModalIsOpen}
        id={props.modalContentId}
        title={props.modalContentTitle}
        closeModal={() => {
          props.setCompleteToDoModalIsOpen(false)
        }}
        setShouldFetchToDoData={props.setShouldFetchTrue}
        setIsLoading={props.setIsLoading}
      />
      <CreateToDoModal
        modalIsOpen={props.createToDoModalIsOpen}
        closeModal={() => {
          props.setCreateToDoModalIsOpen(false)
        }}
        setShouldFetchToDoData={props.setShouldFetchTrue}
        setIsLoading={props.setIsLoading}
      />
      <LoadingModal isLoading={props.isLoading} />
    </>
  )
}

export default Layout
