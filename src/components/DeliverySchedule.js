import React, {useState, useEffect} from 'react';
import {Container, Row, Col, Table, Button, Card, CardHeader, CardBody, ButtonGroup, Spinner, ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem, Form, FormGroup, Input, Label} from 'reactstrap';
import {useAuth} from '../auth'
import moment from 'moment'



const DeliverySchedule = (props) => {

  const appId = props.match.params._id
  const {state, dispatch} = useAuth()

  const [messages, setMessages] = useState([]);
  const [scheduleMessages, setScheduleMessages] = useState([])
  const [dropdownOpen, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true)

  //Filters
  const [deviceType, setDeviceType] = useState('ALL')
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');

  const toggle = () => setOpen(!dropdownOpen);


  const fetchScheduleMessages = async () => {
    console.log('fetching');
    const request = await fetch(`http://localhost:8000/api/messages/appmessages/${appId}/schedule`);
    const json = await request.json()
    return json
  }

  const handleSearch = () => {
    const msgs = [...scheduleMessages]
    if (from) {
      var fromDate = new Date(from)
    }
    if (to) {
      var toDate = new Date(to)
    }
    const filtered = msgs.filter(msg => {
      let sendAt = new Date(msg.sendAt)
      if (fromDate && toDate) {
        return sendAt >= fromDate && sendAt <= toDate
      } else if (fromDate && !toDate) {
        return sendAt >= fromDate
      } else if (!fromDate && toDate) {
        return sendAt <= toDate
      } else {
        return false;
      }
    })
    setMessages([...filtered])
  }



  useEffect(() => {
    dispatch({
      type: 'APPID',
      appId: appId
    })
    fetchScheduleMessages()
      .then(json => {
        setMessages([...json.messages])
        setScheduleMessages([...json.messages])
        setIsLoading(false)
      })

  } , [])



  return (
    <Container>
      <Row>
        <Col md={12}>
          <h1 className="mt-3">Schedule Messages</h1>
        </Col>
      </Row>
      <Row>
        <Col md={10}>
          <Card>
            <CardHeader style={{backgroundColor: 'rgba(0, 191, 140, 0.42)', color: '#212529'}}>Filter messages by: </CardHeader>
            <CardBody>
              <Row>
                <Col md={2}>
                  <ButtonDropdown isOpen={dropdownOpen} toggle={toggle}>
                    <DropdownToggle caret>
                      Device Type: {deviceType}
                    </DropdownToggle>
                    <DropdownMenu>
                      <DropdownItem onClick={() => setDeviceType('ALL')}>All</DropdownItem>
                      <DropdownItem onClick={() => setDeviceType('CHROME')}>Chrome</DropdownItem>
                      <DropdownItem onClick={() => setDeviceType('FIREFOX')}>Firefox</DropdownItem>
                    </DropdownMenu>
                  </ButtonDropdown>
                </Col>
                <Col md={6} className="ml-3" >
                  <Form inline style={{borderLeft: '1px solid rgba(172, 172, 172, 0.63)', paddingLeft: '4px'}} >
                    <FormGroup>
                      <Label className="mr-2">From</Label>
                      <Input style={{maxWidth: '125px'}}  type="text" placeholder="YY-DD-MM" onChange={(e) => setFrom(e.target.value)} />
                    </FormGroup>
                    <FormGroup className="ml-2">
                      <Label className="mr-2">To</Label>
                      <Input style={{maxWidth: '125px'}} type="text" placeholder="YY-DD-MM" onChange={(e) => setTo(e.target.value)} />
                    </FormGroup>
                  </Form>
                </Col>
                <Col  className="d-flex justify-content-end">
                  <Button onClick={() => handleSearch()}>Search</Button>
                </Col>
              </Row>
            </CardBody>
          </Card>
        </Col>
      </Row>
      <Row>
        <Col md={10}>
          {
            (isLoading) ?
              <center><Spinner className="mt-3" size="md" color="dark" /></center>
            : (messages.length > 0) ?
              <Table className="mt-2 text-center" style={{backgroundColor:'rgb(255, 255, 255)', borderRadius:'5px'}}>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Message</th>
                    <th>Recipients</th>
                    <th>Sending At</th>
                  </tr>
                </thead>
                <tbody>
                  {
                      messages.map((msg, idx) =>
                        <tr key={msg._id}>
                          <th scope="row">{idx + 1}</th>
                          <td>{msg.message.title}</td>
                          <td>Status (recipients)</td>
                          <td>{moment(msg.sendAt).fromNow()}</td>
                        </tr>
                      )
                  }
                </tbody>
              </Table>
            : <center><p style={{fontSize: '1.3em'}}>No message to send.</p></center>
          }

        </Col>
      </Row>
    </Container>
  )
}

export default DeliverySchedule
