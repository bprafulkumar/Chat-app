import React from 'react'
import { Drawer,Button, Divider, Alert } from 'rsuite'
import {useProfile} from '../../Context/Profile.context'
import { database } from '../../misc/firebase';
import Editableinput from '../Editableinput';
import ProviderBlock from './ProviderBlock';

function Dashboard({onSignOut}) {
    const  {profile} = useProfile();
   //  console.log(profile)
    // console.log(profile,"indexbar"
    const onSave = async (data) => {
      // console.log(data)
      const userNicknameRef = database.ref(`/profiles/${profile.uid}`).child('name')

      try {
         userNicknameRef.set(data)

         Alert.success("Nickname has been updated",4000)
      } catch (error) {
         Alert.info(error.message,4000)
      }
    }
  return (
    <>
     <Drawer.Header>
        <Drawer.Title>
            Dashboard
        </Drawer.Title>
     </Drawer.Header>

     <Drawer.Body>
        <h3>Hey , {profile.name} </h3>
        <ProviderBlock/>
        <Divider/>
        <Editableinput
        name = "nickname"
        initialValue = {profile.name}
        onSave = {onSave}
        label = {<h6 className='md-2'>Nickname</h6>}
        />
     </Drawer.Body>

     <Drawer.Footer>
        <Button block color='red' onClick={onSignOut} >
                SignOut
        </Button>
     </Drawer.Footer>
    </>
  )
}

export default Dashboard
