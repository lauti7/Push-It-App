import React, {useState, useEffect} from 'react'
import {Container, Row, Col, Table} from 'reactstrap'
import {useAuth} from '../auth'
import moment from 'moment'


const AppSubscribers = (props) => {

  const {state, dispatch} = useAuth()

  const _id = props.match.params._id

  const [subscribers, setSubscribers] = useState([])

  const fecthAppSubscriber = () => {
    fetch(`http://localhost:8000/api/subscribers/${_id}/all`, {
      headers: {
        'Authorization': state.token
      }
    })
    .then(res => res.json())
    .then(json => {
      setSubscribers([...json.subscribers])
    })
  }

  useEffect(() =>{
    dispatch({
      type: 'APPID',
      appId: _id
    })
    fecthAppSubscriber()
  }, [])


  return (
    <Container>
      <Row>
        <Col md={6}>
          <h1 className="mt-3">Subscribers</h1>
        </Col>
      </Row>
      <Row>
        <Col md={10}>
          {
            subscribers.length > 0 ?
              <Table style={{backgroundColor: 'rgb(255, 255, 255)', boxShadow: '-3px 3px 1px 1px rgba(0,0,0,0.05)'}} bordered>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Opt-In Date</th>
                    <th>Device</th>
                    <th>Language</th>
                    <th>Country</th>
                    <th>Sessions Count</th>
                    <th>Last Time Active</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    subscribers.map((sub, idx) =>
                      <tr key={sub._id}>
                        <td>{idx + 1}</td>
                        <td>{moment(sub.optInDate).format("dddd, MMMM Do YYYY")}</td>
                        <td>{sub.os}</td>
                        <td>{sub.lang}</td>
                        <td>{sub.country}</td>
                        <td>{sub.sessionsCount}</td>
                        <td>{moment(sub.lastSession).fromNow()}</td>
                      </tr>
                    )
                  }
                </tbody>
              </Table>
              :
                <p>There is no subscriber yet :(</p>
          }
        </Col>
      </Row>
    </Container>
  )
}


export default AppSubscribers
