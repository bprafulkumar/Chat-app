import React, { memo, useCallback } from 'react'
// import { Navigate } from 'react-router'
import { Alert, Button, Drawer, Icon } from 'rsuite'
import Dashboard from '.'
import { isOfflineForDatabase } from '../../Context/Profile.context'
import { useMediaQuery, useModelState } from '../../misc/custom-hooks'
import { auth, database } from '../../misc/firebase'

// import 'rsuite/styles/index.less'

function DashboardToggle() {

    const isMobile = useMediaQuery('(max-width:992px)')
    const { isOpen , open , close } = useModelState()

    const onSignOut =useCallback(() =>{
      
      database.ref(`/status/${auth.currentUser.uid}`).set(isOfflineForDatabase).then(() => {
        auth.signOut();
      }).catch(err=> {
        Alert.error(err.message,4000);
      })
      Alert.info("SignOut",4000)
      close()
      },[close])
  return (

    <>
      <Button appearance="primary" block color='blue' onClick={open}>
              <Icon icon='dashboard'/>  Dashboard

      </Button>
      <Drawer full={isMobile} show={isOpen} onHide={close} placement='left' >
        <Dashboard onSignOut={onSignOut}/>
      </Drawer>
    </>
  )
}

export default memo(DashboardToggle)
