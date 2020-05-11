import React, {useState, useEffect} from 'react'
import {Input, FormGroup, Label, Container, Row, Col, Button} from 'reactstrap'
import moment from 'moment'

const Schedule = (props) => {

  const [today, setToday] = useState('')
  const [todayFormat, setTodayFormat] = useState('')
  const [scheduleDate, setScheduleDate] = useState('')
  const [displayed, setDisplayed] = useState('')

  useEffect(() => {
    const displayed = moment(props.date).format("MM/DD/YYYY kk:mm a")
    setToday(displayed)
    setTodayFormat(props.date)
    setScheduleDate(props.date);
    setDisplayed(displayed)
  }, [])

  const addTwoHours = () => {
    let date = new Date(scheduleDate)
    let add = moment(date).add(2,'hours').format()
    let displayed = moment(date).add(2,'hours').format("MM/DD/YYYY kk:mm a")
    setScheduleDate(add)
    setDisplayed(displayed)
    props.setDate(add)
  }

  const addTwelveHours = () => {
    let date = new Date(scheduleDate)
    let add = moment(date).add(12,'hours').format()
    let displayed = moment(date).add(12,'hours').format("MM/DD/YYYY kk:mm a")
    setScheduleDate(add)
    setDisplayed(displayed)
    props.setDate(add)

  }

  const tommorow = () => {
    let date = new Date(scheduleDate)
    let add = moment(date).add(24,'hours').format()
    let displayed = moment(date).add(24,'hours').format("MM/DD/YYYY kk:mm a")
    setScheduleDate(add)
    setDisplayed(displayed)
    props.setDate(add)

  }

  const addOneWeek = () => {
    let date = new Date(scheduleDate)
    let add = moment(date).add(7,'days').format()
    let displayed = moment(date).add(7,'days').format("MM/DD/YYYY kk:mm a")
    setScheduleDate(add)
    setDisplayed(displayed)
    props.setDate(add)

  }

  const handleChange = (value) => {
    let date = new Date(value)
    const schedule = moment(date).format()
    setScheduleDate(schedule)
    props.setDate(schedule)
  }


  return (
    <Container>
      <Row>
        <Col md={12}>
          <div className="mt-2">
            <span>Wait Until</span>
            <Input className="mt-2" type="text" value={displayed} onChange={(e) => handleChange(e.target.value)}/>
          </div>
        </Col>
      </Row>
      <Row>
        <Col md={12}>
          <ul className="d-flex justify-content-around flex-wrap " style={{listStyle: 'none', paddingLeft: 0}}>
            <li className="px-2"><Button onClick={() => addTwoHours()} className="mt-2" size="sm" style={{backgroundColor: 'rgba(91, 91, 91, 0.7)', border:'1px solid rgba(91, 91, 91, 0.7)'}}>+ 2 Hours</Button></li>
            <li className="px-2"><Button onClick={() => addTwelveHours()} className="mt-2" size="sm" style={{backgroundColor: 'rgba(91, 91, 91, 0.7)', border:'1px solid rgba(91, 91, 91, 0.7)'}}>+ 12 Hours</Button></li>
            <li className="px-2"><Button onClick={() => tommorow()} className="mt-2" size="sm" style={{backgroundColor: 'rgba(91, 91, 91, 0.7)', border:'1px solid rgba(91, 91, 91, 0.7)'}}>Tommorow</Button></li>
            <li className="px-2"><Button onClick={() => addOneWeek()} className="mt-2" size="sm" style={{backgroundColor: 'rgba(91, 91, 91, 0.7)', border:'1px solid rgba(91, 91, 91, 0.7)'}}>One week</Button></li>
          </ul>
        </Col>
      </Row>
    </Container>
  )
}

export default Schedule
