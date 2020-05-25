import React, {useEffect, useState} from 'react';
import {Container, Row, Col, Input} from 'reactstrap';
import {useAuth} from '../../auth'
import EqualOperators from './EqualOperators'
import ValueInput from './ValueInput'

const BrowserCondition = ({id, conditionIdx}) => {

  const {state, dispatch} = useAuth()

  const [browser, setBrowser] = useState('Chrome')


  const handleBrowser = e => {
    setBrowser(e.target.value)
  }

  useEffect(() => {
    dispatch({
      type: 'SAVECONDITION',
      conditionIdx,
      condition: {id, value: browser}
    })
  }, [browser])

  return (
    <Container>
      <Row>
        <Col md={12}>
          <div className="d-flex justify-content-around mt-2">
            <div className='text-center' style={{width:'140px', backgroundColor: 'rgba(0, 241, 3, 0.25)', color:'rgba(10, 10, 10, 0.71)', padding: '5px', borderRadius: '5px'}} >Browser</div>
            <EqualOperators id={id} conditionIdx={conditionIdx} />
            <Input className="flex-grow-1" type="select" onChange={(e) => handleBrowser(e)}>
              <option value="Chrome">Chrome</option>
              <option value="Firefox">Firefox</option>
              <option value="Edge">Edge</option>
            </Input>
          </div>
        </Col>
      </Row>
    </Container>
  )
}

export default BrowserCondition
