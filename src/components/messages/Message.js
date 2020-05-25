import React, {useEffect, useState} from 'react'
import {Container, Col, Row, Card, CardHeader, CardBody, Spinner, Button, CustomInput} from 'reactstrap'
import {useAuth} from '../../auth'

const Message = (props) => {

  const {state, dispatch} = useAuth()

  const [message, setMessage] = useState(null)

  const appId = props.match.params._id
  const messageId = props.match.params.messageId

  const fetchMessage = () => {
    fetch(`http://localhost:8000/api/messages/${messageId}`, {
      headers: {
        'Authorization': state.token
      }
    })
    .then(res => res.json())
    .then(json => {
      if (json.success) {
        setMessage(json.message)
      } else {
        setMessage(null)
      }
    })
    .catch(e => console.log(e))
  }


  useEffect(() => {
    dispatch({
      type: 'APPID',
      appId
    })
    fetchMessage()
  }, [])

  return (
    <Container>
    {
      !message ?
        'Error'
      :
      <>
      <Row>
        <Col md={12}>
          <h1 className="mt-2">{message?.name}</h1>
        </Col>
      </Row>
      <Row>
        <Col md={3}>
          <Card>
            <CardHeader>
              <div className="d-flex justify-content-between">
                <p style={{padding: 0, margin: 0}}>Total Recipients</p>
                <Button style={{padding: 0, margin: 0}} color="link" onClick={() => props.history.push(`/apps/${appId}/messages/${messageId}/recipients`)}>Log</Button>
              </div>
            </CardHeader>
            <CardBody>
              0
            </CardBody>
          </Card>
        </Col>
        <Col md={3}>
          <Card>
            <CardHeader>
              <div className="d-flex justify-content-between">
                <p style={{padding: 0, margin: 0}} >Delivered Count</p>
                <Button style={{padding: 0, margin: 0}} color="link" onClick={() => props.history.push(`/apps/${appId}/messages/${messageId}/sending/delivered`)}>Log</Button>
              </div>
            </CardHeader>
            <CardBody>
              0
            </CardBody>
          </Card>
        </Col>
        <Col md={3}>
          <Card>
            <CardHeader>
              <div className="d-flex justify-content-between">
                <p style={{padding: 0, margin: 0}} >Failed Count</p>
                <Button style={{padding: 0, margin: 0}} color="link" onClick={() => props.history.push(`/apps/${appId}/messages/${messageId}/sending/failed`)}>Log</Button>
              </div>
            </CardHeader>
            <CardBody>
              0
            </CardBody>
          </Card>
        </Col>
        <Col md={3}>
          <Card>
            <CardHeader>
              <div className="d-flex justify-content-between">
                <p style={{padding: 0, margin: 0}} >Clicks Count</p>
                <Button style={{padding: 0, margin: 0}} color="link" onClick={() => props.history.push(`/apps/${appId}/messages/${messageId}/clicks`)}>Log</Button>
              </div>
            </CardHeader>
            <CardBody>
              0
            </CardBody>
          </Card>
        </Col>
      </Row>
      <Row>
        <Col md={12}>
          <h3 className="mt-3">Notification</h3>
        </Col>
      </Row>
      </>
    }


    </Container>
  )


}

export default Message
