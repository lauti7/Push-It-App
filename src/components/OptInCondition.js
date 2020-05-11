import React, {useEffect} from 'react';
import {Container, Row, Col, Input} from 'reactstrap';
import {useAuth} from '../auth'
import MathOperators from './MathOperators'
import ValueInput from './ValueInput'



const OptInCondition = ({id}) => {

  return (
    <Container>
      <Row>
        <Col md={12}>
          <div className="d-flex justify-content-around mt-2">
            <div style={{backgroundColor: 'rgba(0, 241, 3, 0.25)', color:'rgba(10, 10, 10, 0.71)', padding: '5px', borderRadius: '5px' }}>Opt In Date</div>
            <MathOperators id={id} />
            <ValueInput id={id}/>
          </div>
        </Col>
      </Row>
    </Container>
  )
}

export default OptInCondition
