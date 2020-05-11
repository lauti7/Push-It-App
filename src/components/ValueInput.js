import React, {useEffect} from 'react';
import {Input} from 'reactstrap'
import {useAuth} from '../auth'

const ValueInput = ({id}) => {

  const {state, dispatch} = useAuth()


  const handleValue = e => {
    dispatch({
      type: 'SAVECONDITION',
      condition: {id, value: e.target.value}
    })
  }


  return (
    <>
      <div className="d-flex mx-2">
        <Input style={{maxWidth: '30%'}} type="text" name="value" onChange={(e) => handleValue(e)} />
      </div>
    </>
  )
}

export default ValueInput
