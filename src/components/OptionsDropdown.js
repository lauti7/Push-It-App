import React, {useState} from 'react'
import { ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem} from 'reactstrap'
import {useAuth} from '../auth'
import AppDropdownMenu from './AppDropdownMenu'
import MessageDropdownMenu from './MessageDropdownMenu'


const OptionsDropdown = ({type, messageId=false, appId=false}) => {

  const [dropdownOpen, setOpen] = useState(false);

  const toggle = () => setOpen(!dropdownOpen);

  const handleMenu = () => {
    switch (type) {
      case 'message':
        return <MessageDropdownMenu messageId={messageId}/>
      case 'app':
        return <AppDropdownMenu appId={appId}/>
    }
  }

  return (
    <ButtonDropdown isOpen={dropdownOpen} toggle={toggle}>
       <DropdownToggle style={{backgroundColor:'#00bf8c', borderColor: '#00bf8c'}} caret>
         OPTIONS
       </DropdownToggle>
       {
         handleMenu()
       }
     </ButtonDropdown>
  )
}

export default OptionsDropdown
