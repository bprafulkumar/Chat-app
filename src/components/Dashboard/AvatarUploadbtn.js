import React, { useState } from 'react'
import { Alert, Button, Input, Modal } from 'rsuite'
import { useModelState } from '../../misc/custom-hooks'
import AvatarEditor from 'react-avatar-editor'



const fileInputType = '.png,.jpeg,.jpg'
const acceptedFileTypes = ['image/png', 'image/jpeg' , 'image/pjpeg']
const isVaildFile = (file) => acceptedFileTypes.includes(file.type)


function AvatarUploadbtn() {

    const {isOpen , open , close} = useModelState()
    const [img , setImg] =useState(null)

    const onFileInputChange = (ev) =>{
        const currFiles = ev.target.files;

        if(currFiles.length === 1){
            const file = currFiles[0]
            if(isVaildFile(file)){
                setImg(file)
                open()
            }else{
                Alert.warning(`Wrong file type ${file.type}`,4000)
            }
        }
    }

  return (
    <div className='mt-3 text-center'>

        <label htmlFor='avatar-upload' className='d-block cursor-pointer padded'>
            Select new avatar
        </label>

        <input id='avatar-upload' className='d-none' type='file' accept= {fileInputType} onChange={onFileInputChange} >
        </input>
        
        <Modal show={isOpen} onHide={close}>
            <Modal.Header>
                <Modal.Title>
                    Adjust and upload new avatar
                </Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <div className='d-flex justify-content-center align-items-center'>
                {
                    img && <AvatarEditor
                    image= {img}
                    width={200}
                    height={200}
                    border={10}
                    borderRadius ={100}
                  />
                }
                </div>
            </Modal.Body>

            <Modal.Footer>
                <Button block appearance='ghost'> Upload new avatar</Button>
            </Modal.Footer>
        </Modal>
    </div>
  )
}

export default AvatarUploadbtn
