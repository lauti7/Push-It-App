import React, {useEffect} from 'react';
import {Container, Row, Col, Input} from 'reactstrap';
import {useAuth} from '../auth'
import MathOperators from './MathOperators'
import ValueInput from './ValueInput'

const SessionCountCondition = ({id, conditionIdx}) => {

  return (
    <Container>
    <Row>
      <Col md={12}>
        <div className="d-flex justify-content-around mt-2">
          <div className='text-center' style={{width:'140px',backgroundColor: 'rgba(0, 241, 3, 0.25)', color:'rgba(10, 10, 10, 0.71)', padding: '5px', borderRadius: '5px' }}>Session Count</div>
          <MathOperators id={id} conditionIdx={conditionIdx} />
          <ValueInput id={id} conditionIdx={conditionIdx}/>
        </div>
      </Col>
    </Row>
    </Container>
  )
}

export default SessionCountCondition
