import React, {useState, useEffect} from 'react';
import {Container, Row, Col, Table, Button, Card, CardHeader, CardBody, FormGroup, Input, Label, ListGroup, ListGroupItem} from 'reactstrap';
import {useAuth} from '../auth'
import Condition from './Conditions'
import uuid from 'react-uuid'


const NewSegment = props => {

  const {state, dispatch} = useAuth()

  const [added, setAdd] = useState([])
  const [name, setName] = useState('')


  const appId = props.match.params._id
  // console.log(appId);

  const add = (kind) => {
    setAdd([...added, kind])
    dispatch({
      type: 'SAVECONDITION',
      condition: {id: kind.id, field: kind.kind, operator: '', value: '', type: kind.type}
    })
    console.log(state.conditions);
  }

  const saveSegment = () => {
    console.log('Save segment');
    fetch(`http://localhost:8000/api/segments/${state.appId}/create`, {
      method: 'POST',
      headers:{
        'Content-Type': 'application/json',
        'Authorization': state.token
      },
      body: JSON.stringify({name, conditions:[...state.conditions], match: 'and'})
    })
  }

  useEffect(() => {
    console.log('mounted');
    dispatch({
      type: 'APPID',
      appId
    })
    dispatch({
      type: 'INITNEWSEGMENT'
    })
  }, [])





  return (
    <Container>
      <Row>
        <Col md={12}>
          <h1 className="mt-3">New Segment</h1>
        </Col>
      </Row>
      <Row>
        <Col md={10}>
          <Card body>
            <FormGroup>
              <Label>Name</Label>
              <Input type="text" value={name} onChange={(e) => setName(e.target.value)} />
            </FormGroup>
            <Row>
              <Col md={3}>
                <ListGroup>
                  <ListGroupItem className="d-flex flex-row justify-content-between align-items-center"><p style={{padding: 0, margin: 0}}>Opt In Date</p> <span><Button size="sm" style={{backgroundColor: '#00bf8c'}} onClick={() => add({kind: 'optInDate', id: uuid(), type: 'date'})}>Add</Button></span></ListGroupItem>
                  <ListGroupItem className="d-flex flex-row justify-content-between align-items-center"><p style={{padding: 0, margin: 0}}>Last Session</p> <span><Button size="sm" style={{backgroundColor: '#00bf8c'}} onClick={() => add({kind: 'lastSession', id: uuid(), type: 'date'})}>Add</Button></span></ListGroupItem>
                  <ListGroupItem className="d-flex flex-row justify-content-between align-items-center"><p style={{padding: 0, margin: 0}}>Sessions Count</p> <span><Button size="sm" style={{backgroundColor: '#00bf8c'}} onClick={() => add({kind: 'sessionsCount', id: uuid(), type: 'number'})}>Add</Button></span></ListGroupItem>
                  <ListGroupItem className="d-flex flex-row justify-content-between align-items-center"><p style={{padding: 0, margin: 0}}>Language</p> <span><Button size="sm" style={{backgroundColor: '#00bf8c'}} onClick={() => add({kind: 'lang', id: uuid(), type: 'string'})}>Add</Button></span></ListGroupItem>
                  <ListGroupItem className="d-flex flex-row justify-content-between align-items-center"><p style={{padding: 0, margin: 0}}>Country</p> <span><Button size="sm" style={{backgroundColor: '#00bf8c'}} onClick={() => add({kind: 'country', id: uuid(), type: 'string'})}>Add</Button></span></ListGroupItem>
                  <ListGroupItem className="d-flex flex-row justify-content-between align-items-center"><p style={{padding: 0, margin: 0}}>Operative System</p> <span><Button size="sm" style={{backgroundColor: '#00bf8c'}} onClick={() => add({kind: 'os', id: uuid(), type: 'string'})}>Add</Button></span></ListGroupItem>
                  <ListGroupItem className="d-flex flex-row justify-content-between align-items-center"><p style={{padding: 0, margin: 0}}>Browser</p> <span><Button size="sm" style={{backgroundColor: '#00bf8c'}} onClick={() => add({kind: 'browser', id: uuid(), type: 'string'})}>Add</Button></span></ListGroupItem>
                </ListGroup>
              </Col>
              <Col md={9}>
                {
                  state?.conditions?.map(condition => (<Condition field={condition.field} id={condition.id} key={condition.id}  />))
                }
              </Col>
            </Row>
            <Row>
              <Col md={12}>
                <Button size="md" className="mt-2" onClick={() => saveSegment()}>Save</Button>
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>

    </Container>
  )
}

export default NewSegment
