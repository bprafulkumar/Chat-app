import React, { memo, useContext } from 'react'
import { Button, Modal } from 'rsuite'
import { CurrentRoomContext } from '../../../Context/current-room.context'
import { useModelState } from '../../../misc/custom-hooks'

function RoomInfoBtnModal() {
    const details = useContext(CurrentRoomContext)

    const {isOpen ,close, open } = useModelState();

  return (
    <>
        <Button appearance='link' className='px-0' onClick={open}>
            Room information
        </Button>

        <Modal show={isOpen} onHide={close}>

            <Modal.Header >
                About {details.name}
            </Modal.Header>

            <Modal.Body>
                <h6 className='mb-1'>Description</h6>
                <p>{details.description}</p>
            </Modal.Body>
            <Modal.Footer>
                <Button block onClick={close}>Close</Button>
            </Modal.Footer>
        </Modal>
    </>
  )
}

export default memo(RoomInfoBtnModal)
