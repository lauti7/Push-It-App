import React, {useEffect, useState} from 'react'
import {Container, Col, Row, Card, CardHeader, CardBody, Spinner, Button, CustomInput} from 'reactstrap'
import {useAuth} from '../auth'
import moment from 'moment'
import SubscribersTable from './SubscribersTable'

const AppSegment = (props) => {

  const {state, dispatch} = useAuth()

  const [segment, setSegment] = useState(null)
  const [segmentSubscribers, setSegmentSubscribers] = useState([])
  const [segmentLoading, setSegmentLoading] = useState(true)
  const [subscribersLoading, setSubscribersLoading] = useState(true)
  const [switchStatus, setSwitchStatus] = useState(false)


  const appId = props.match.params._id
  const segmentId = props.match.params.segmentId

  const fetchSegment = () => {
    fetch(`http://localhost:8000/api/segments/${segmentId}`, {
      headers: {
        'Authorization': state.token
      }
    })
    .then(res => res.json())
    .then(json => {setSegment(json.segment);setSegmentLoading(false); if(json.segment.status === 'enable'){setSwitchStatus(true)}})
  }

  const fetchSegmentSubscriber = () => {
    fetch(`http://localhost:8000/api/segments/${segmentId}/subscribers`, {
      headers: {
        'Authorization': state.token
      }
    })
    .then(res => res.json())
    .then(json => {setSegmentSubscribers([...json.subscribers]); setSubscribersLoading(false)})
  }

  const changeStatus = (e) => {
    setSwitchStatus(!switchStatus)
    fetch(`http://localhost:8000/api/segments/${segmentId}/status?status=${!switchStatus}`, {
      headers: {
        'Authorization': state.token
      }
    })
    .then(res => res.json())
    .then(json => {
      setSegment(json.segment)
    })
  }

  const previewCondition = () => {

  }

  useEffect(() => {
    dispatch({
      type: 'APPID',
      appId
    })
    fetchSegment()
    fetchSegmentSubscriber()
  }, [])


  return (
    <Container>
      <Row>
        <Col md={12}>
          <h1 className="mt-3">{segment?.name ? segment.name : ''}</h1>
        </Col>
      </Row>
      <Row>
        <Col md={4}>
          <Card>
            <CardHeader>
              <div className="d-flex w-100 justify-content-between">
                <p style={{padding: 0, margin: 0}}>Status</p>
                <span>
                  <CustomInput type="switch" id="exampleCustomSwitch" checked={switchStatus} onChange={(e) => changeStatus(e)} />
                </span>
              </div>
            </CardHeader>
            <CardBody>
              {segmentLoading ?
                <Spinner size="md" color="dark"/>
                :
                  <span>
                    {
                      segment?.status === 'enable' ?
                        <p style={{ backgroundColor: 'rgba(0, 241, 3, 0.25)', color:'rgba(10, 10, 10, 0.71)', padding: 0, margin: 0}} className="text-center">Enable</p>
                      : <p style={{ backgroundColor: 'rgba(241, 0, 0, 0.25)', color:'rgba(10, 10, 10, 0.71)', padding: 0, margin: 0}} className="text-center">Disable</p>

                    }
                  </span>
              }
            </CardBody>
          </Card>
        </Col>
        <Col md={4}>
          <Card>
            <CardHeader>
              Condition
            </CardHeader>
            <CardBody>
              {segmentLoading ? <Spinner size="md" color="dark"/> :  <span className="d-flex justify-content-center"><Button style={{padding: 0, margin: 0}} color="link" onClick={(() => previewCondition())}>Preview</Button></span>}
            </CardBody>
          </Card>
        </Col>
        <Col md={4}>
          <Card>
            <CardHeader>
              Count
            </CardHeader>
            <CardBody>
              {segmentLoading ? <Spinner size="md" color="dark"/> :  <span style={{padding: 0, margin: 0}} className="d-flex text-center"><p style={{padding: 0, margin: 0}} className="pr-2">{segment?.count}</p> <p style={{padding: 0, margin: 0}} className="text-muted">Last Updated: {moment(segment?.updatedAt).fromNow()}</p></span>}
            </CardBody>
          </Card>
        </Col>
      </Row>
      <Row>
        <Col md={12}>
          <h3 className="mt-3">Segment Subscribers</h3>
        </Col>
      </Row>
      <SubscribersTable subscribers={segmentSubscribers}/>
    </Container>
  )
}

export default AppSegment
