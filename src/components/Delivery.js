import React, {useState, useEffect} from 'react';
import {Container, Row, Col, Table, Button, Card, CardHeader, CardBody, ButtonGroup, Spinner, ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem, Form, FormGroup, Input, Label} from 'reactstrap';
import {useAuth} from '../auth'


const Delivery = (props) => {

  const appId = props.match.params._id
  const {state, dispatch} = useAuth()

  const [messages, setMessages] = useState([]);
  const [sentMessages, setSentMessages] = useState([])
  const [dropdownOpen, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true)

  //Filters
  const [deviceType, setDeviceType] = useState('ALL')
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');

  const toggle = () => setOpen(!dropdownOpen);


  const fetchSentMessages = async () => {
    console.log('fetching');
    const request = await fetch(`http://localhost:8000/api/messages/appmessages/${appId}/sent`);
    const json = await request.json()
    return json
  }

  const handleSearch = () => {
    const msgs = [...sentMessages]
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
    console.log('mounted');
    dispatch({
      type: 'APPID',
      appId: appId
    })
    fetchSentMessages()
      .then(json => {
        setMessages([...json.messages])
        setSentMessages([...json.messages])
        setIsLoading(false)
      })

  } , [])



  return (
    <Container>
      <Row>
        <Col md={6}>
          <h1 className="mt-3">Sent Messages</h1>
        </Col>
        <Col md={4}>
          <div className="d-flex flex-row-reverse" style={{width: '100%'}}>
            <Button className="mt-4" size="md" onClick={() => props.history.push(`/apps/${appId}/delivery/schedule`)}>Schedule messsages</Button>
          </div>
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
              <Table className="mt-2" style={{backgroundColor:'rgb(255, 255, 255)', borderRadius:'5px'}}>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Message</th>
                    <th>Recipients</th>
                    <th>Sent At</th>
                    <th>Sent</th>
                    <th>Clicked</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {
                      messages.map((msg, idx) =>
                        <tr key={msg._id}>
                          <th scope="row">{idx + 1}</th>
                          <td>{msg.message.title}</td>
                          <td>Status (recipients)</td>
                          <td>{msg.sendAt}</td>
                          <td>sent times</td>
                          <td>clicks</td>
                          <td>actions</td>
                        </tr>
                      )
                  }
                </tbody>
              </Table>
            : <center><p style={{fontSize: '1.3em'}}>No message sent.</p></center>
          }

        </Col>
      </Row>
    </Container>
  )
}

export default Delivery
