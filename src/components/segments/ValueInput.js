import React, {useEffect} from 'react';
import {Input} from 'reactstrap'
import {useAuth} from '../../auth'

const ValueInput = ({id, conditionIdx}) => {

  const {state, dispatch} = useAuth()


  const handleValue = e => {
    dispatch({
      type: 'SAVECONDITION',
      conditionIdx,
      condition: {id, value: e.target.value}
    })
  }


  return (
    <>
      <div className="flex-grow-1">
        <Input type="text" name="value" onChange={(e) => handleValue(e)} />
      </div>
    </>
  )
}

export default ValueInput
