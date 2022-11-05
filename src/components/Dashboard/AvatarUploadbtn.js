import React, { useRef, useState } from 'react'
import { Alert, Button, Input, Modal } from 'rsuite'
import { useModelState } from '../../misc/custom-hooks'
import AvatarEditor from 'react-avatar-editor'
// import { wait } from '@testing-library/user-event/dist/utils'
import { database, storage } from '../../misc/firebase'
import { useProfile } from '../../Context/Profile.context'
import Profileavatar from './Profileavatar'



const fileInputType = '.png,.jpeg,.jpg'

const acceptedFileTypes = ['image/png', 'image/jpeg' , 'image/pjpeg']

const isVaildFile = (file) => acceptedFileTypes.includes(file.type)

const getblob = canvas => {
    return new Promise((resolve,reject) => {
        canvas.toBlob(blob=>{
            if(blob){
                resolve(blob)
            }else{
                reject(new Error(`File process Error`))
            }
        })
    })
}


function AvatarUploadbtn() {

    const AvatarEditableRef = useRef()

    const {isOpen , open , close} = useModelState()
    const [img , setImg] =useState(null)
    const {profile} = useProfile()
    const [isLoading , setIsLoading] = useState(false)

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

    const onUploadClick = async() =>{
        const canvas = AvatarEditableRef.current.getImageScaledToCanvas()

        setIsLoading(true)
        try {
            const blob = await getblob(canvas)

            const avatarFileRef = storage.ref(`profile/${profile.uid}`).child('avatar')

            const uploadAvatarResult = await avatarFileRef.put(blob , {
                cacheControl : `public , max-age= ${3600*24*3}`

            })
            const downloadUrl = await uploadAvatarResult.ref.getDownloadURL()

            const userAvatarRef = database.ref(`/profiles/${profile.uid}`).child('avatar')

            await userAvatarRef.set(downloadUrl)
            setIsLoading(false)
            Alert.info('Avatar has been uploaded',4000)
        } catch (error) {
            setIsLoading(false)
            Alert.error(error.message,4000)
        }
    }

  return (
    <div className='mt-3 text-center'>

        <Profileavatar src={profile.avatar} name ={profile.name} className="img-fullsize" style={{width:'200px',height:'200px',fontSize : '100px'}} />

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
                    ref={AvatarEditableRef}
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
                <Button block appearance='ghost' onClick={onUploadClick} disabled={isLoading}> Upload new avatar</Button>
            </Modal.Footer>
        </Modal>
    </div>
  )
}

export default AvatarUploadbtn
