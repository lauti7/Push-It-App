import React from 'react'
import {DropdownItem, DropdownMenu} from 'reactstrap'
import {useAuth} from '../auth'
import {withRouter} from 'react-router-dom';



const MessageDropdownMenu = ({messageId, history}) => {

  const {state} = useAuth()


  const duplicate = () => {

  }

  const deleteMsg = () => {

  }

  return (
    <DropdownMenu>
      <DropdownItem onClick={(e) => history.push(`/apps/${state.appId}/messages/${messageId}`)}>View</DropdownItem>
      <DropdownItem onClick={() => duplicate()}>Duplicate</DropdownItem>
      <DropdownItem onClick={() => deleteMsg()}>Delete</DropdownItem>
    </DropdownMenu>
  )
}

export default withRouter(MessageDropdownMenu)
