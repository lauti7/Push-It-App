import React, {useState, useEffect} from 'react'
import {Container, Row, Col, Table} from 'reactstrap'
import {useAuth} from '../../auth'
import moment from 'moment'
import SubscribersTable from '../containers/SubscribersTable'


const AppSubscribers = (props) => {

  const {state, dispatch} = useAuth()

  const _id = props.match.params._id

  const [subscribers, setSubscribers] = useState([])

  const fecthAppSubscriber = () => {
    fetch(`http://localhost:8000/api/subscribers/${_id}/all`, {
      headers: {
        'Authorization': state.token
      }
    })
    .then(res => res.json())
    .then(json => {
      setSubscribers([...json.subscribers])
    })
  }

  useEffect(() =>{
    dispatch({
      type: 'APPID',
      appId: _id
    })
    fecthAppSubscriber()
  }, [])


  return (
    <Container>
      <Row>
        <Col md={6}>
          <h1 className="mt-3">Subscribers</h1>
        </Col>
      </Row>
      <SubscribersTable subscribers={subscribers}/>
    </Container>
  )
}


export default AppSubscribers
