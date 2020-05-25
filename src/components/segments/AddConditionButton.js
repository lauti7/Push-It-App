import React, { useState, useEffect } from 'react';
import { Button, UncontrolledPopover, PopoverHeader, PopoverBody } from 'reactstrap';
import {useAuth} from '../../auth'

const AddConditionButton = ({conditionType}) => {

  console.log(conditionType);

  const {state, dispatch} = useAuth()

  const [popoverOpen, setPopoverOpen] = useState(false);

  const toggle = () => setPopoverOpen(!popoverOpen);

  const add = (idx = -1 ) => {
    console.log(idx);
    if (idx >= 0) {
      console.log('hasanindex');
      setPopoverOpen(false)
    }
    dispatch({
      type: 'SAVECONDITION',
      conditionIdx: idx === -1 ? 0 : idx,
      condition: {id: conditionType.id, field: conditionType.kind, operator: '', value: '', type: conditionType.type}
    })
    console.log(state.conditions);
  }



  return (
    <div>

      {
        state?.conditions?.length >= 2 ?
        <>
        <Button id={`Popover-${conditionType.id}`} type="button" size ="sm" style={{backgroundColor: '#00bf8c'}} >
          Add
        </Button>
        <UncontrolledPopover trigger="legacy" placement="bottom" isOpen={popoverOpen} target={`Popover-${conditionType.id}`} toggle={toggle}>
          <PopoverHeader>Choose place for the new condition</PopoverHeader>
          <PopoverBody>
            {
              state?.conditions?.map((condition, idx) => (<Button className="mx-1"  key={condition} onClick={() => add(idx)} size="sm">{idx + 1} Set</Button>))
            }
          </PopoverBody>
        </UncontrolledPopover>
        </>
        : <>
          <Button id="Popover1" type="button" size ="sm" style={{backgroundColor: '#00bf8c'}} onClick={() => add()}>
            Add
          </Button>
        </>
      }

    </div>
  )
}

export default AddConditionButton
