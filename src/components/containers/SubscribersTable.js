import React from 'react'
import {Row, Col, Table} from 'reactstrap'
import moment from 'moment'


const SubscribersTable = ({subscribers}) => {


  return (
    <>
      <Row>
        <Col md={12}>
          {
            subscribers.length > 0 ?
              <Table className="text-center" style={{backgroundColor: 'rgb(255, 255, 255)', boxShadow: '-3px 3px 1px 1px rgba(0,0,0,0.05)'}} bordered>
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
    </>
  )
}

export default SubscribersTable
