import React, {useState, useEffect} from 'react';
import {Container, CustomInput, Card, CardHeader, CardBody, Button, CardTitle, CardText, Row, Col, FormGroup, Label, Input, ListGroup, ListGroupItem, Modal, ModalBody} from 'reactstrap'
import Schedule from './Schedule'
import ModalSegments from './ModalSegments'
import moment from 'moment'
import {useAuth} from '../auth'

const NewMessage = (props) => {

  const _id = props.match.params._id

  const {state, dispatch} = useAuth()

  const [modal, setModal] = useState(false);
  const toggle = () => {
    setModal(!modal);

  }


  const [message, setMessage] = useState({})
  const [name, setName] = useState('')
  const [segments, setSegments] = useState([])
  const [selectedSegments, setSelectedSegments] = useState([])
  const [sendToSubscribedUsers, setSendToSubscribedUsers] = useState(true)
  const [sendToSegments, setSendToSegments] = useState(false)
  const [afterCreation, setAfterCreation] = useState(true)
  const [atParticularTime, setAtParticularTime] = useState(false)
  const [upToYou, setUpToYou] = useState(false)
  const [defaultWay, setDefaultWay] = useState(true)
  const [intelligentWay, setIntelligentWay] = useState(false)
  const [scheduleDate, setScheduleDate] = useState('')
  const [displayedDate, setDisplayedDate] = useState('')



  console.log(props);

  const handleSendAt = value => {
    switch (value) {
      case 'afterCreation':
        setAfterCreation(true)
        setUpToYou(false)
        setAtParticularTime(false)
        break;
      case 'schedule':
        setAfterCreation(false)
        setUpToYou(false)
        setAtParticularTime(true)
        break;
      case 'uptoyou' :
        setAfterCreation(false)
        setUpToYou(true)
        setAtParticularTime(false)
        break;
    }
  }

  const create = (draft = false) => {

    const newMessage = {
      message,
      name,
      selectedSegments,
      sendToSubscribedUsers,
      sendToSegments,
      afterCreation,
      atParticularTime,
      scheduleDate,
      upToYou,
      defaultWay,
      intelligentWay,
      draft,
      appId: _id
    }

    fetch(`http://localhost:8000/api/messages/appmessages/${_id}/newmessage`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({message: newMessage})
    })
    .then(res => res.json())
    .then(json => {
      props.history.push(`/apps/${_id}/messages`)
    })
  }

  const addTwoHours = () => {
    let date = new Date(scheduleDate)
    let add = moment(date).add(2,'hours').format()
    let displayed = moment(date).add(2,'hours').format("MM/DD/YYYY kk:mm a")
    setScheduleDate(add)
    setDisplayedDate(displayed)
  }

  const addTwelveHours = () => {
    let date = new Date(scheduleDate)
    let add = moment(date).add(12,'hours').format()
    let displayed = moment(date).add(12,'hours').format("MM/DD/YYYY kk:mm a")
    setScheduleDate(add)
    setDisplayedDate(displayed)

  }

  const tommorow = () => {
    let date = new Date(scheduleDate)
    let add = moment(date).add(24,'hours').format()
    let displayed = moment(date).add(24,'hours').format("MM/DD/YYYY kk:mm a")
    setScheduleDate(add)
    setDisplayedDate(displayed)

  }

  const addOneWeek = () => {
    let date = new Date(scheduleDate)
    let add = moment(date).add(7,'days').format()
    let displayed = moment(date).add(7,'days').format("MM/DD/YYYY kk:mm a")
    setScheduleDate(add)
    setDisplayedDate(displayed)
  }

  const handleChange = value => {
    setDisplayedDate(value)
    let date = moment(value, "MM/DD/YYYY kk:mm a")
    let schedule = moment(date).format()
    setScheduleDate(schedule)
  }

  const fetchSegments = () => {
    fetch(`http://localhost:8000/api/segments/app/${_id}`,{
      headers: {
        'Authorization': state.token
      }
    })
    .then(res => res.json())
    .then(json => {
      setSegments([...json.segments])
    })
  }

  const selectSegment = segmentId => {
    const segments = [...selectedSegments, segmentId]
    setSelectedSegments([...segments])

  }

  const removeSegment = segmentId => {
    const segments = [...selectedSegments]
    const newSegments = segments.filter(s => s !== segmentId)

    setSelectedSegments([...newSegments])
  }

  const checkSelected = segmentId => {
    console.log(segmentId);
    const selected = [...selectedSegments]
    console.log(selected);
    const found = selected.findIndex(s => s === segmentId)
    console.log(found);
    if (found !== -1) {
      return true
    }

    return false
  }


  useEffect(() => {
    dispatch({
      type: 'APPID',
      appId: _id
    })
    const today = moment().format()
    const displayed = moment().format("MM/DD/YYYY kk:mm a")
    setScheduleDate(today)
    setDisplayedDate(displayed)
    fetchSegments()
  }, [])


  return (
    <Container>
      <h1 className="mt-3">New Message</h1>
      <Card>
        <CardHeader>Name</CardHeader>
        <CardBody className="my-3">
          <Row className="ml-1">
            <Col md={6}>
              <Input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Message name" />
            </Col>
          </Row>
        </CardBody>
      </Card>
      <Card className="my-3">
        <CardHeader>Audience</CardHeader>
        <CardBody className="my-3">
          <Row className="ml-1">
            <Col md="6">
              <FormGroup>
                <div>
                  <CustomInput type="radio" checked={sendToSubscribedUsers} onChange={(e) => {setSendToSegments(!sendToSegments);setSendToSubscribedUsers(!sendToSubscribedUsers); toggle()}} id="exampleCustomRadio" name="customRadio" label="Send to subscribed users" />
                  <CustomInput type="radio"  checked={sendToSegments} onChange={(e) => {setSendToSegments(!sendToSegments);setSendToSubscribedUsers(!sendToSubscribedUsers); toggle()}} id="exampleCustomRadio2" name="customRadio" label="Send to particular segment(s)" />
                  {
                    sendToSegments ?
                    <Modal isOpen={modal} toggle={toggle}>
                      <ModalBody>
                        <h4>Choose segments</h4>
                        <ListGroup>
                          {
                            segments.map(segment => {
                              return (
                                <ListGroupItem key={segment._id} className="d-flex flex-row justify-content-between align-items-center">
                                  <p  style={{padding: 0, margin: 0}}>{segment.name}</p>
                                  <p  style={{padding: 0, margin: 0}}>{segment.count ? segment.count : '0'}</p>
                                  {
                                    (!checkSelected(segment._id)) ?
                                      <span><Button size="sm" style={{backgroundColor: '#00bf8c'}} onClick={() => selectSegment(segment._id)}>Selected</Button></span>
                                    :
                                      <span><Button size="sm" style={{backgroundColor: '#b42946'}} onClick={() => removeSegment(segment._id)}>Remove</Button></span>
                                  }
                                </ListGroupItem>
                              )
                            })
                          }
                        </ListGroup>
                      </ModalBody>
                    </Modal>
                    : ''
                  }
                </div>
              </FormGroup>
            </Col>
          </Row>
        </CardBody>
      </Card>
      <Card className="my-3">
        <CardHeader>Message</CardHeader>
        <CardBody>
          <Row className="ml-1">
            <Col md="6">
              <Card>
                <CardBody>
                  <Row>
                    <Col md="12">
                      <FormGroup>
                        <Label>Title</Label>
                        <Input type="text" placeholder="Notification Title" onChange={(e) => setMessage({...message, title: e.target.value})}/>
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col md="12">
                      <FormGroup>
                        <Label>Message</Label>
                        <Input type="textarea" placeholder="Notification Message" onChange={(e) => setMessage({...message, message: e.target.value})}/>
                      </FormGroup>
                    </Col>
                  </Row>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </CardBody>
      </Card>
      <Card className="my-3">
        <CardHeader>Platforms</CardHeader>
        <CardBody>
          <Row className="ml-1">
            <Col md="6">
              <Card>
                <CardHeader>Google Chrome</CardHeader>
                <CardBody>
                  <Row>
                    <Col md="12">
                      <FormGroup>
                        <Label>Icon</Label>
                        <Input type="text" placeholder=""/>
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col md="12">
                      <FormGroup>
                        <Label>Image</Label>
                        <Input type="input" placeholder=""/>
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col md="12">
                      <FormGroup>
                        <Label>Badge</Label>
                        <Input type="input" placeholder=""/>
                      </FormGroup>
                    </Col>
                  </Row>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </CardBody>
      </Card>
      <Card className="my-3">
        <CardHeader>Schedule</CardHeader>
        <CardBody>
          <Row className="ml-1">
            <Col md="6">
              <Card>
                <CardHeader>Send At</CardHeader>
                <CardBody>
                  <Row>
                    <Col md="12">
                      <FormGroup>
                        <div>
                          <CustomInput type="radio" value="afterCreation" checked={afterCreation} onChange={(e) => handleSendAt(e.target.value)} id="send1"  label="Send after finishing message creation" name="afterCreation" />
                          <CustomInput type="radio" value="schedule" checked={atParticularTime} onChange={(e) => handleSendAt(e.target.value)} id="send2"  label="Send at particular time" name="atParticularTime"/>
                          {
                            (atParticularTime) ?
                              <Container>
                                <Row>
                                  <Col md={12}>
                                    <div className="mt-2">
                                      <span>Wait Until</span>
                                      <Input className="mt-2" type="text" value={displayedDate} onChange={(e) => handleChange(e.target.value)}/>
                                    </div>
                                  </Col>
                                </Row>
                                <Row>
                                  <Col md={12}>
                                    <ul className="d-flex justify-content-around flex-wrap " style={{listStyle: 'none', paddingLeft: 0}}>
                                      <li className="px-2"><Button onClick={() => addTwoHours()} className="mt-2" size="sm" style={{backgroundColor: 'rgba(91, 91, 91, 0.7)', border:'1px solid rgba(91, 91, 91, 0.7)'}}>+ 2 Hours</Button></li>
                                      <li className="px-2"><Button onClick={() => addTwelveHours()} className="mt-2" size="sm" style={{backgroundColor: 'rgba(91, 91, 91, 0.7)', border:'1px solid rgba(91, 91, 91, 0.7)'}}>+ 12 Hours</Button></li>
                                      <li className="px-2"><Button onClick={() => tommorow()} className="mt-2" size="sm" style={{backgroundColor: 'rgba(91, 91, 91, 0.7)', border:'1px solid rgba(91, 91, 91, 0.7)'}}>Tommorow</Button></li>
                                      <li className="px-2"><Button onClick={() => addOneWeek()} className="mt-2" size="sm" style={{backgroundColor: 'rgba(91, 91, 91, 0.7)', border:'1px solid rgba(91, 91, 91, 0.7)'}}>One week</Button></li>
                                    </ul>
                                  </Col>
                                </Row>
                              </Container>
                            : ''
                          }
                          <CustomInput type="radio" value="uptoyou" checked={upToYou} onChange={(e) => handleSendAt(e.target.value)} id="send3"  label="Up to you" name="upToYou"/>
                        </div>
                      </FormGroup>
                    </Col>
                  </Row>
                </CardBody>
              </Card>
            </Col>
            <Col md="6">
              <Card>
                <CardHeader>Sending Ways</CardHeader>
                <CardBody>
                  <Row>
                    <Col md="12">
                      <FormGroup>
                        <div>
                          <CustomInput type="radio" checked={defaultWay} onChange={(e) => {setDefaultWay(!defaultWay); setIntelligentWay(!intelligentWay)}} id="send3"  label="Default Way" name="default" />
                          <CustomInput name="smart" type="radio" checked={intelligentWay} onChange={(e) => {setIntelligentWay(!intelligentWay); setDefaultWay(!defaultWay)}} id="send4"  label="Smart Way" />
                        </div>
                      </FormGroup>
                    </Col>
                  </Row>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </CardBody>
      </Card>
      <Button className="my-3" onClick={() => create()} color="success" size="lg">Create</Button>
      <Button className="m-3" onClick={() => create(true)} color="secondary" size="md">Save as draft</Button>
    </Container>
  )
}

export default NewMessage
