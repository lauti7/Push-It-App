import React from 'react'
import {DropdownItem, DropdownMenu} from 'reactstrap'
import {withRouter} from 'react-router-dom';


const AppDropdownMenu = ({appId, history}) => {


  const rename = () => {

  }

  const remove = () => {

  }

  return (
    <DropdownMenu>
      <DropdownItem onClick={(e) => history.push(`/apps/${appId}`)}>View</DropdownItem>
      <DropdownItem onClick={() => rename() }>Rename</DropdownItem>
      <DropdownItem onClick={() => remove()}>Remove</DropdownItem>
    </DropdownMenu>
  )
}

export default withRouter(AppDropdownMenu)
