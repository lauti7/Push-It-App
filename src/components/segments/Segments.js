import React, {useState, useEffect} from 'react'
import {Container, Row, Col, ListGroup, ListGroupItem, Button} from 'reactstrap'
import {useAuth} from '../../auth'

const Segments = (props) => {

  const {state, dispatch} = useAuth()

  const _id = props.match.params._id

  const [segments, setSegments] = useState([])

  const fetchAppSegments = () => {
    fetch(`http://localhost:8000/api/segments/app/${_id}`, {
      headers: {
        'Authorization': state.token
      }
    })
    .then(res => res.json())
    .then(json => {
      setSegments([...json.segments])
    })
  }

  useEffect(() => {
    dispatch({
      type: 'APPID',
      appId: _id
    })
    fetchAppSegments()
  }, [])




  return (
    <Container>
      <Row>
        <Col md={6}>
          <h1 className="mt-3">Segments</h1>
        </Col>
        <Col md={4}>
          <div className="d-flex flex-row-reverse" style={{width: '100%'}}>
            <Button className="mt-4" size="md" onClick={() => props.history.push(`/apps/${_id}/segments/new`)}>New segment</Button>
          </div>
        </Col>
      </Row>
      <Row>
        <Col md={10}>
          {
            segments.length > 0 ?
              <ListGroup>
                {
                  segments.map(segment => {
                    return (
                      <ListGroupItem key={segment._id} className="d-flex justify-content-between">
                        <p style={{margin: 0, padding:0}}>{segment.name}</p>
                        <span><Button size="sm" style={{backgroundColor: '#00bf8c'}} onClick={() => props.history.push(`/apps/${_id}/segments/${segment._id}`)} >View</Button></span>
                      </ListGroupItem>
                    )
                  })
                }
              </ListGroup>
              :
                <p>There is no segment created.</p>
          }
        </Col>
      </Row>
    </Container>
  )
}

export default Segments
