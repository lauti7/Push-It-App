import React, {useState, useEffect} from 'react'
import {Container, Col, Row, Table} from 'reactstrap'
import {useAuth} from '../../../auth'
import moment from 'moment'

const ClicksLog = props => {


  const {state, dispatch} = useAuth()


  const [clicks, setClicks] = useState([])

  const messageId = props.match.params.messageId
  const appId = props.match.params._id

  const fetchMessageClicks = () => {
    fetch(`http://localhost:8000/api/clicks/log/${messageId}`, {
      headers: {
        'Authorization': state.token
      }
    })
    .then(res => res.json())
    .then(json => {
      if (json.success) {
        setClicks([...json.clicks])
      } else {
        setClicks(null)
      }
    })
    .catch(e => console.log(e))
  }



  useEffect(() => {
    dispatch({
      type: 'APPID',
      appId
    })
    fetchMessageClicks()
  }, [])


  return (
    <Container>
      <Row>
        <Col md={12}>
          <h1 className="mt-3">Clicks Log</h1>
        </Col>
      </Row>
      {
        clicks.length > 0 ?
          <>
            <Table className="text-center" style={{backgroundColor: 'rgb(255, 255, 255)', boxShadow: '-3px 3px 1px 1px rgba(0,0,0,0.05)'}} bordered>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Clicked Url</th>
                  <th>Clicked At</th>
                  <th>Browser</th>
                  <th>Device</th>
                  <th>Country</th>
                </tr>
              </thead>
              <tbody>
                {
                  clicks.map((click, idx) =>
                    <tr key={click._id}>
                      <td>{idx + 1}</td>
                      <td>{click.clickedUrl}</td>
                      <td>{moment(click.clickedAt).fromNow()}</td>
                      <td>{click.subscriber.browser}</td>
                      <td>{click.subscriber.os}</td>
                      <td>{click.subscriber.country}</td>
                    </tr>
                  )
                }
              </tbody>
            </Table>
          </>
          : 'There is no click yet'
      }
    </Container>
  )


}

export default ClicksLog
