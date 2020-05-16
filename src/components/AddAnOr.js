import React, {useState, useEffect} from 'react'
import {Button} from 'reactstrap'
import {useAuth} from '../auth'

const AddAnOr = () => {

  const {state, dispatch} = useAuth()



  const handleAdd = () => {
    dispatch({
      type: 'ADD_OR'
    })
  }


  return (
    <>
      <Button className="align-self-center mt-2 ml-3" size="sm" onClick={() => handleAdd()}>OR</Button>
    </>
  )
}

export default AddAnOr
