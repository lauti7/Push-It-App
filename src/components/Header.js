import React, { useEffect } from 'react';
import {Link} from 'react-router-dom'
import {useAuth} from '../auth'
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  NavbarText
} from 'reactstrap';
import {withRouter} from 'react-router-dom';

const Header = (props) => {

  const {state, dispatch} = useAuth()

  return (
    <div>
      <Navbar className="Header" light  expand="md">
        <NavbarBrand href="/">Push-It</NavbarBrand>
        <Nav navbar>
          {
            (state.isAuthenticated) ?
              <NavItem>
                <NavLink href="/account" >Account</NavLink>
              </NavItem>
              : ''
          }

        </Nav>
        {
        (state.isAuthenticated && props.location.pathname.indexOf('/apps/') > -1) ?
            <Nav className="m-auto" navbar>
              <NavItem>
                  <NavLink href={`/apps/${state.appId}`}>Dashboard</NavLink>
              </NavItem>
              <NavItem>
                <UncontrolledDropdown nav inNavbar>
                   <DropdownToggle nav caret>
                     Messages
                   </DropdownToggle>
                   <DropdownMenu>
                     <DropdownItem onClick={(e) => props.history.push(`/apps/${state.appId}/messages`)}>
                        Messages
                     </DropdownItem>
                     <DropdownItem onClick={(e) => props.history.push(`/apps/${state.appId}/messages/templates`)}>
                       Templates
                     </DropdownItem>
                     <DropdownItem onClick={(e) => props.history.push(`/apps/${state.appId}/messages/automation`)}>
                       Automation
                     </DropdownItem>
                   </DropdownMenu>
                 </UncontrolledDropdown>
              </NavItem>
              <NavItem>
                <UncontrolledDropdown nav inNavbar>
                   <DropdownToggle nav caret>
                     Audience
                   </DropdownToggle>
                   <DropdownMenu>
                     <DropdownItem onClick={(e) => props.history.push(`/apps/${state.appId}/subscribers`)}>
                       All Subscribers
                     </DropdownItem>
                     <DropdownItem onClick={(e) => props.history.push(`/apps/${state.appId}/segments`)}>
                       Segments
                     </DropdownItem>
                   </DropdownMenu>
                 </UncontrolledDropdown>
              </NavItem>
              <UncontrolledDropdown nav inNavbar>
                 <DropdownToggle nav caret>
                   Delivery
                 </DropdownToggle>
                 <DropdownMenu>
                   <DropdownItem onClick={(e) => props.history.push(`/apps/${state.appId}/delivery/sent`)}>
                     Sent Messages
                   </DropdownItem>
                   <DropdownItem onClick={(e) => props.history.push(`/apps/${state.appId}/delivery/schedule`)}>
                     Schedule Message
                   </DropdownItem>
                 </DropdownMenu>
               </UncontrolledDropdown>
              <NavItem>
                  <NavLink href={`/apps/${state.appId}/settings`} >Settings</NavLink>
              </NavItem>
            </Nav>
          : ''

        }

        <Nav navbar>
            {
              state.isAuthenticated ?
                <NavItem>
                  <NavLink href='/' onClick={() => dispatch({ type: "LOGOUT" })}>Log Out</NavLink>
                </NavItem>

              :
              <>
                <NavItem>
                  <NavLink href="/login" >Log in</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink href="/register" >Sign Up</NavLink>
                </NavItem>
              </>


            }
        </Nav>

      </Navbar>
    </div>
  );
}

export default withRouter(Header);
