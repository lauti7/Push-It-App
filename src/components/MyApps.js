import React, {useState, useEffect} from 'react';
import {useAuth} from '../auth'
import {Link} from 'react-router-dom'
import {Container, Table, Input, Row, Col, Button, ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem} from 'reactstrap';
import OptionsDropdown from './OptionsDropdown'

const MyApps = (props) => {

  const {state, dispatch} = useAuth()

  const [dropdownOpen, setOpen] = useState(false);
  const [myApps, setMyApps] = useState([])

  const toggle = () => setOpen(!dropdownOpen);

  useEffect(() => {
    fetch('http://localhost:8000/api/applications/myapps', {
      method: 'POST',
      headers: {
        'Authorization': state.token
      }
    })
    .then(res => res.json())
    .then(json => {
      if (json.success) {
        setMyApps([...json.applications])
      }
    })
    .catch(e => console.log(e))
  }, [])

  return (
    <Container>
      <h1 className="mt-3">All Applications</h1>
      <Row>
        <Col md={6}>
          <Button className="my-3" style={{backgroundColor:'#00bf8c', borderColor: '#00bf8c'}} size="sm">
            <Link to="/newapp" style={{color: 'white', textDecoration: 'none'}}>
              New App/Website
            </Link>
          </Button>

        </Col>
      </Row>
      {
        (myApps.length > 0) ?
          <Table style={{backgroundColor: 'rgb(255, 255, 255)', boxShadow: '-3px 3px 1px 1px rgba(0,0,0,0.05)'}} bordered>
             <thead>
               <tr>
                 <th className="text-center">NAME</th>
                 <th className="text-center">TOTAL USERS</th>
                 <th className="text-center">TOTAL USERS PER DAY</th>
                 <th className="text-center">SUBSCRIBED USERS</th>
                 <th className="text-center">ACTIONS</th>
               </tr>
             </thead>
             <tbody>
              {
                  myApps.map(app => (
                    <tr key={app._id}>
                      <td className="text-center">{app.name}</td>
                      <td className="text-center">50</td>
                      <td className="text-center">5</td>
                      <td className="text-center">40</td>
                      <td className="text-center">
                        <OptionsDropdown type="app" appId={app._id}/>
                      </td>
                    </tr>
                  ))
              }
             </tbody>
           </Table>
           : <h4 className="text-center">There is no app created yet</h4>

      }

    </Container>
  )
}

export default MyApps
