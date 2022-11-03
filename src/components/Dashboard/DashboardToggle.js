import React from 'react'
import { Button, Drawer, Icon } from 'rsuite'
import Dashboard from '.'
import { useModelState } from '../../misc/custom-hooks'

// import 'rsuite/styles/index.less'

function DashboardToggle() {
    const { isOpen , open , close } = useModelState()
  return (

    <>
      <Button appearance="primary" block color='blue' onClick={open}>
            <Icon icon='dashboard'/>Dashboard
            
      </Button>
      <Drawer show={isOpen} onHide={close} placement='left' >
        <Dashboard/>
      </Drawer>
    </>
  )
}

export default DashboardToggle
