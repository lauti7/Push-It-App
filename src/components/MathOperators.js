import React, {useEffect, useState} from 'react';
import {Input} from 'reactstrap'
import {useAuth} from '../auth'

const MathOperators = ({id}) => {

  const {state, dispatch} = useAuth()

  const [operator, setOperator] = useState('lte')

  const handleOperator = (e) => {
    setOperator(e.target.value)
  }

  useEffect(() => {
    dispatch({
      type: 'SAVECONDITION',
      condition: {id, operator}
    })
  }, [operator])

  return (
    <>
      <div style={{maxWidth: '30%'}} className="mx-2">
        <Input type="select" name="operator" onChange={(e) => handleOperator(e) }>
          <option value="lte">More than</option>
          <option value="gte">Less than</option>
        </Input>
      </div>
    </>
  )
}
export default MathOperators
