import React from 'react'
import { Modal } from 'rsuite'
import { useModelState } from '../../../misc/custom-hooks'

function ImgBtnModal({src,fileName}) {

    const {isOpen,open, close} = useModelState()
  return (
      <>
      <input type='image' src={src} alt="file" onClick={open} className="mw-100 mh-100 w-auto" />

      <Modal show={isOpen} onHide={close}>
        <Modal.Header>
            <Modal.Title>{fileName.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <div>
                <img src={src} height='95%' width='95%' alt= "file" />
            </div>
        </Modal.Body>
        <Modal.Footer>
            <a href={src} target="_blank" rel='noopener noreferrer'>
                View original
            </a>
        </Modal.Footer>
      </Modal>
      </>
  )
}

export default ImgBtnModal
