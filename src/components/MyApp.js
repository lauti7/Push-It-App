import React, {useState, useEffect} from 'react';
import {useAuth} from '../auth'
import {Link} from 'react-router-dom'
import {Container, Row, Col, Button, Card, CardHeader, CardBody, Spinner} from 'reactstrap';

const MyApp = (props) => {

  const {state, dispatch} = useAuth()

  const [app, setApp] = useState({})
  const [isLoading, setIsLoading] = useState(true)


  const _id = props.match.params._id



  useEffect(() => {
    console.log('mounted');
    dispatch({
      type: 'APPID',
      appId: _id
    })
    fetch(`http://localhost:8000/api/applications/apps/${_id}`, {
      method: 'GET',
      headers: {
        Authorization: state.token
      }
    })
    .then(res => res.json())
    .then(json => {
      console.log(json);
      setApp({
        ...json.application,
      })
      setIsLoading(false)
    })
  }, [])


  return (
    <Container>
      <Row>
        <Col md={12}>
          <h2 className="mt-3">Dashboard</h2>
        </Col>
      </Row>
      <Row>
        <Col md={12}>
          <h5 className="mt-3">Users</h5>
        </Col>
      </Row>
      <Row>
        <Col md={4}>
          <Card>
            <CardHeader>
              <p>Subscribed Users</p>
            </CardHeader>
            <CardBody>
              {isLoading ? <Spinner size="md" color="dark"/> :  <p>{app.subscribedSub}</p>}
            </CardBody>
          </Card>
        </Col>
        <Col md={4}>
          <Card>
            <CardHeader>
              <p>Monthly Active Userss</p>
            </CardHeader>
            <CardBody>
              {isLoading ? <Spinner size="md" color="dark"/> :  <p>0</p>}
            </CardBody>
          </Card>
        </Col>
        <Col md={4}>
          <Card>
            <CardHeader>
              <p>Total Users</p>
            </CardHeader>
            <CardBody>
              {isLoading ? <Spinner size="md" color="dark"/> :  <p>{app.totalSubscribers}</p>}
            </CardBody>
          </Card>
        </Col>
      </Row>

    </Container>
  )
}

export default MyApp
