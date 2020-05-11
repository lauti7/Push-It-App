import React, {useState, useEffect} from 'react';
import {useAuth} from '../auth'
import {Link} from 'react-router-dom';
import {Container, Row, Col, ListGroup, ListGroupItem, Button, Card, CardHeader, CardBody, ButtonGroup, Spinner,} from 'reactstrap'
import OptionsDropdown from './OptionsDropdown'

const Messages = (props) => {

  const {state, dispatch} = useAuth()

  const _id = props.match.params._id


  const [messages, setMessages] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [showMsg, setShowMsg] = useState(true)
  const [showDraft, setShowDraft] = useState(false)



  const fecthMessages = (draft) => {
    setIsLoading(true)
    fetch(`http://localhost:8000/api/messages/appmessages/${_id}?showDraft=${draft}`)
    .then(res => res.json())
    .then(json => {
      console.log(json);
      setIsLoading(false)
      if (json.messages.length > 0) {
        setMessages([...json.messages])
      } else {
        setMessages([])
      }
    })
  }

  useEffect(() => {
    dispatch({
      type: 'APPID',
      appId: _id
    })
    fecthMessages(showDraft)
  }, [showMsg, showDraft])

  const send = (id) => {
    const msgid = {msgid: id}
    fetch('http://localhost:8000/api/messages/send', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(msgid)
    })
    .then(res => console.log(res))
  }

  return (
    <Container>
      <Row>
        <Col md={12}>
          <h2 className="mt-3">Messages</h2>
        </Col>
      </Row>
      <Row>
        <Col md={10}>
          <div className="d-flex justify-content-between">
            <div>
              <Button className="mr-2" ><Link to={`/apps/${_id}/messages/new`} style={{textDecoration: 'none', color:'white'}}>New Push Message</Link></Button>
              <ButtonGroup>
                <Button color={(showMsg) ? 'primary' : 'secondary'} onClick={() => {setShowMsg(!showMsg); setShowDraft(!showDraft);}}>Messages</Button>
                <Button color={(showDraft) ? 'primary' : 'secondary'} onClick={() => {setShowDraft(!showDraft); setShowMsg(!showMsg)}}>Draft</Button>
              </ButtonGroup>
            </div>
            <div>
              <Button><Link to={`/apps/${_id}/delivery/sent`} style={{textDecoration: 'none', color: 'white'}}>See sent messages</Link></Button>
            </div>
          </div>
        </Col>
      </Row>
      <Row>
        <Col md={10}>
          <Card className="mt-3" body>
            {
              (isLoading) ?
                <center>
                  <Spinner color="dark" size="md" />
                </center>
              : (messages?.length === 0) ?
                  <p className="text-center" style={{margin:0, fontWeight: 'bold', fontSize: '1.1em'}}>There is no message</p>
                : <ListGroup >
                    {messages?.map(message =>
                      <ListGroupItem className="d-flex flex-row justify-content-between align-items-center" key={message._id}>
                        <p style={{margin: 0, fontSize: '1.1em', padding: 0}} >{message.message.title}</p>
                        <p style={{margin: 0, fontSize: '1.1em', padding: 0}}><strong>Status: </strong>{message.status}</p>
                        <span>
                          <OptionsDropdown type="message" messageId={message._id} />
                        </span>
                      </ListGroupItem>
                      )
                    }
                  </ListGroup>


            }
          </Card>
        </Col>
      </Row>

    </Container>
  )
}

export default Messages
