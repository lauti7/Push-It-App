import React, {useState, useEffect} from 'react';
import {Container, Card, Button, CardTitle, CardText, Row, Col, FormGroup, Label, Input} from 'reactstrap';
import {useAuth} from '../auth'


const NewApp = (props) => {

  const {state, dispatch} = useAuth()

  const [firstStep, setFirstDone] = useState(false);
  const [secondStep, setSecondDone] = useState(false);
  const [name, setName] = useState('')
  const [siteName, setSiteName] = useState('');
  const [siteUrl, setSiteUrl] = useState('');
  const [title, setTitle] = useState('')
  const [message, setMessage] = useState('')
  const [link, setLink] = useState('')



  const saveApp = () => {
    console.log('Saving App');
    const application ={
      name,
      siteName,
      siteUrl,
      welcomeNotification: {
        title,
        message,
        link
      }
    }
    fetch('http://localhost:8000/api/applications/create', {
      method: 'POST',
      headers:{
        'Content-Type': 'application/json',
        'Authorization': state.token
      },
      body: JSON.stringify(application)
    })
    .then(res => res.json())
    .then(json => {
      console.log(json);
      props.history.push('/myapps')
    })
  }




  return (
    <Container>
      <h3 className="mt-3">New App / Website</h3>
      <Row>
        <Col md="12">
          <Card  body>
            <Row>
              <Col md={6}>
                <FormGroup>
                  <Label >Name of your app or website</Label>
                  <Input type="text" value={name} onChange={(e) => setName(e.target.value)}/>
                </FormGroup>
              </Col>
            </Row>
            {
              firstStep ?
              <Row>
                <Col md={12}>
                  <h4>Site Setup</h4>
                  <Row>
                    <Col md={6}>
                      <FormGroup>
                        <Label >Site Name</Label>
                        <Input type="text" placeholder="My Website" value={siteName} onChange={(e) => setSiteName(e.target.value)} />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col md={6}>
                      <FormGroup>
                        <Label >Site Url</Label>
                        <Input type="text" placeholder="https://site.com or https://www.site.com" value={siteUrl} onChange={(e) => setSiteUrl(e.target.value)}/>
                      </FormGroup>
                    </Col>
                  </Row>
                </Col>
              </Row>
              : ''

            }
            {
              secondStep ?
              <Row>
                <Col md={12}>
                  <h4>Welcome Notification</h4>
                  <Row>
                    <Col md={6}>
                      <FormGroup>
                        <Label >Title</Label>
                        <Input type="text" placeholder="My Website" value={title} onChange={(e) => setTitle(e.target.value)}/>
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col md={6}>
                      <FormGroup>
                        <Label >Message</Label>
                        <Input type="text" placeholder="Thanks for subscribing!" value={message} onChange={(e) => setMessage(e.target.value)}/>
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col md={6}>
                      <FormGroup>
                        <Label >Link to Launch</Label>
                        <Input type="text" placeholder="Link to open" value={link} onChange={(e) => setLink(e.target.value)}/>
                      </FormGroup>
                    </Col>
                  </Row>
                </Col>
              </Row>
              : ''

            }
            <Row>
              <Col md={6}>
                <Button size="md" style={{backgroundColor:'#00bf8c', borderColor: '#00bf8c' }} onClick={() => {
                  if (firstStep && secondStep) {
                    console.log('tessssst');
                    saveApp()
                  } else if (!firstStep) {
                    console.log(1);
                    setFirstDone(true)
                  } else if (firstStep) {
                    console.log('2');
                    setSecondDone(true)
                  }
                }}>{(firstStep && secondStep) ? 'Save' : 'Next'}</Button>
              </Col>
            </Row>

          </Card>
        </Col>
      </Row>
    </Container>
  )
}

export default NewApp
