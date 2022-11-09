import React from 'react'
import { memo } from 'react'
import { useContext } from 'react'
import { useParams } from 'react-router'
import { Alert, Button, Drawer } from 'rsuite'
import { CurrentRoomContext } from '../../../Context/current-room.context'
import { useMediaQuery, useModelState } from '../../../misc/custom-hooks'
import { database } from '../../../misc/firebase'
import Editableinput from '../../Editableinput'

function EditRoomBtnDrawer() {

    const {isOpen , open,close} = useModelState()

    const isMobile = useMediaQuery('(max-width:992px)')

    const details = useContext(CurrentRoomContext)

    const {id} = useParams


    const updateData = (key,value) => {
        database.ref(`rooms/${id}`).child(key).set(value).then(() => {
            Alert.success('Successfully updated',4000)
        }).catch((err) => {
            Alert.error(err.message,4000)
        })
    }
   const onNameSave = (newName) => {
        updateData('name', newName)
   }

   const onDescriptionSave = (newDesc) => {
    updateData('description', newDesc)
}

  return (
    <div>
      <Button className='br-circle' size='sm' color='red' onClick={open}>
        A
      </Button>

      <Drawer full={isMobile} show={isOpen} onHide={close} placement='right'>
        <Drawer.Header>
            <Drawer.Title>
                Edit Room
            </Drawer.Title>
        </Drawer.Header>

        <Drawer.Body>
            <Editableinput initialValue={details.name} onSave={onNameSave} label={<h6 className='mb-2'>Name</h6>} emptyMsg='Name can be empty' />

            <Editableinput initialValue={details.description} onSave={onDescriptionSave} emptyMsg='Description can not be empty' wrapperClassName= 'mt-3'/>
        </Drawer.Body>

        <Drawer.Footer>
            <Button block onClick={close}>
                Close
            </Button>
        </Drawer.Footer>
      </Drawer>
    </div>
  )
}

export default memo(EditRoomBtnDrawer)
