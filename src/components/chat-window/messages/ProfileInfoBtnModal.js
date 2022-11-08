import React from 'react'
import { Button, Modal } from 'rsuite';
import { useModelState } from '../../../misc/custom-hooks';
import AvatarUploadbtn from '../../Dashboard/AvatarUploadbtn';
import Profileavatar from '../../Dashboard/Profileavatar';

function ProfileInfoBtnModal({profile, ...btnProps}) {

    const {isOpen , open , close} = useModelState()

    const {name , avatar , createdAt} =profile;

    const memberSince = new Date(createdAt).toLocaleDateString();

    const shortName = profile.name.split(' ')[0];
  return (
    <>
      
      <Button {...btnProps} onClick={open}>
        {shortName}
      </Button>

      <Modal show={isOpen} onHide={close}>
        <Modal.Header>
            <Modal.Title>{shortName}</Modal.Title>
        </Modal.Header>
        <Modal.Body className='text-center'>
        <Profileavatar src={avatar} name ={name} className="img-fullsize" style={{width:'200px',height:'200px',fontSize : '100px'}} />

        <h4 className='mt-2'>{name}</h4>
        <p>Member since {memberSince}</p>
        </Modal.Body>
        <Modal.Footer>
            <Button block onClick={close}>
                Close
            </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default ProfileInfoBtnModal
