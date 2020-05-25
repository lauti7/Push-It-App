import React, {useEffect, useState} from 'react';
import {Container, Row, Col, Input} from 'reactstrap';
import {useAuth} from '../../auth'
import EqualOperators from './EqualOperators'
import ValueInput from './ValueInput'

const OSCondition = ({id, conditionIdx}) => {

  const {state, dispatch} = useAuth()

  const [oss, setOSs] = useState([])

  const handleOs = e => {
    dispatch({
      type: 'SAVECONDITION',
      conditionIdx,
      condition: {id, value: e.target.value}
    })
  }

  useEffect(() => {
    fetch(`http://localhost:8000/api/subscribers/${state.appId}/os`,{
      headers: {
        'Authorization': state.token
      }
    })
    .then(res => res.json())
    .then(json => setOSs([...json.os]))
  }, [])

  return (
    <Container>
      <Row>
        <Col md={12}>
          <div className="d-flex justify-content-around mt-2">
            <div className='text-center' style={{width:'140px',backgroundColor: 'rgba(0, 241, 3, 0.25)', color:'rgba(10, 10, 10, 0.71)', padding: '5px', borderRadius: '5px' }}>OS</div>
            <EqualOperators id={id} conditionIdx={conditionIdx} />
            {
              (oss.length > 0) ?
                <Input className="flex-grow-1" type="select" onChange={(e) => handleOs(e)}>
                  {
                    oss.map((os, idx) => {
                      return (
                        <option key={idx} value={os}>{os}</option>
                      )
                    })
                  }
                </Input>
              : ''
            }

          </div>
        </Col>
      </Row>
    </Container>
  )
}

export default OSCondition
