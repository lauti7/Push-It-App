import React, {useState, useEffect} from 'react';
import {Container, Row, Col, Table, Button, Card, CardHeader, CardBody, FormGroup, Input, Label, ListGroup, ListGroupItem} from 'reactstrap';
import {useAuth} from '../auth'
import Condition from './Conditions'
import AddAnOr from './AddAnOr'
import AddConditionButton from './AddConditionButton'
import uuid from 'react-uuid'


const NewSegment = props => {

  const {state, dispatch} = useAuth()

  const [name, setName] = useState('')


  const appId = props.match.params._id
  // console.log(appId);

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


  console.log();



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
                  <ListGroupItem className="d-flex flex-row justify-content-between align-items-center"><p style={{padding: 0, margin: 0}}>Opt In Date</p> <AddConditionButton conditionType={{kind: 'optInDate', id: uuid(), type: 'date'}}/></ListGroupItem>
                  <ListGroupItem className="d-flex flex-row justify-content-between align-items-center"><p style={{padding: 0, margin: 0}}>Last Session</p> <AddConditionButton conditionType={{kind: 'lastSession', id: uuid(), type: 'date'}}/></ListGroupItem>
                  <ListGroupItem className="d-flex flex-row justify-content-between align-items-center"><p style={{padding: 0, margin: 0}}>Sessions Count</p> <AddConditionButton conditionType={{kind: 'sessionsCount', id: uuid(), type: 'number'}}/></ListGroupItem>
                  <ListGroupItem className="d-flex flex-row justify-content-between align-items-center"><p style={{padding: 0, margin: 0}}>Language</p> <AddConditionButton conditionType={{kind: 'lang', id: uuid(), type: 'string'}}/></ListGroupItem>
                  <ListGroupItem className="d-flex flex-row justify-content-between align-items-center"><p style={{padding: 0, margin: 0}}>Country</p> <AddConditionButton conditionType={{kind: 'country', id: uuid(), type: 'string'}}/></ListGroupItem>
                  <ListGroupItem className="d-flex flex-row justify-content-between align-items-center"><p style={{padding: 0, margin: 0}}>Operative System</p><AddConditionButton conditionType={{kind: 'os', id: uuid(), type: 'string'}}/> </ListGroupItem>
                  <ListGroupItem className="d-flex flex-row justify-content-between align-items-center"><p style={{padding: 0, margin: 0}}>Browser</p> <AddConditionButton conditionType={{kind: 'browser', id: uuid(), type: 'string'}}/></ListGroupItem>
                </ListGroup>
              </Col>
              <Col md={9}>
                {
                    (state?.conditions?.length > 0 && state.conditions[0].length) ?
                      <>
                        {
                          state.conditions.map((condition, idx) => (
                            <>
                              <h4 style={{paddingLeft: '15px'}} className="mt-2">{idx + 1} Set</h4>
                              {
                                [...condition].map(c => (
                                  <Condition field={c.field} id={c.id} key={c.id} conditionIdx={idx}  />
                                ))
                              }
                            </>
                          ))
                        }
                        <AddAnOr />
                      </>
                    :
                    <p className="text-center mt-2" style={{fontWeight: 'bold'}}>Start creating a new segment</p>

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
