import React, { useCallback } from 'react'
import { Navigate } from 'react-router'
import { Alert, Button, Drawer, Icon } from 'rsuite'
import Dashboard from '.'
import { useMediaQuery, useModelState } from '../../misc/custom-hooks'
import { auth } from '../../misc/firebase'

// import 'rsuite/styles/index.less'

function DashboardToggle() {

    const isMobile = useMediaQuery('(max-width:992px)')
    const { isOpen , open , close } = useModelState()

    const onSignOut =useCallback(() =>{
      auth.signOut();
        Alert.info("SignOut",4000)
        close()
      },[close])
  return (

    <>
      <Button appearance="primary" block color='blue' onClick={open}>
            <Icon icon='dashboard'/>Dashboard

      </Button>
      <Drawer full={isMobile} show={isOpen} onHide={close} placement='left' >
        <Dashboard onSignOut={onSignOut}/>
      </Drawer>
    </>
  )
}

export default DashboardToggle
