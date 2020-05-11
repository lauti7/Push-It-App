import React, {useEffect, useState} from 'react';
import {useAuth} from '../auth'
import {Input} from 'reactstrap'


const EqualOperators = ({id}) => {

  const {state, dispatch} = useAuth()

  const [operator, setOperator] = useState('eq')

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
          <option value="eq">IS</option>
          <option value="ne">IS NOT</option>
        </Input>
      </div>
    </>
  )
}
export default EqualOperators
