import React, {useEffect, useState} from 'react';
import {useAuth} from '../auth'
import {Input} from 'reactstrap'


const EqualOperators = ({id, conditionIdx}) => {

  const {state, dispatch} = useAuth()

  const [operator, setOperator] = useState('eq')

  const handleOperator = (e) => {
    setOperator(e.target.value)
  }

  useEffect(() => {
    dispatch({
      type: 'SAVECONDITION',
      conditionIdx,
      condition: {id, operator}
    })
  }, [operator])

  return (
    <>
      <div className="mx-2" style={{width: '100px'}}>
        <Input type="select" name="operator" onChange={(e) => handleOperator(e) }>
          <option value="eq">IS</option>
          <option value="ne">IS NOT</option>
        </Input>
      </div>
    </>
  )
}
export default EqualOperators
