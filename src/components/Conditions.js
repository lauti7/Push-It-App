import React, {useEffect} from 'react'
import OptInCondition from './OptInCondition'
import LastSessionCondition from './LastSessionCondition'
import SessionCountCondition from './SessionCountCondition'
import LanguageCondition from './LanguageCondition'
import CountryCondition from './CountryCondition'
import OSCondition from './OSCondition'
import BrowserCondition from './BrowserCondition'




const Condition = ({field, id, conditionIdx}) => {

  useEffect(() => {
    console.log('Mounted Condition');
  }, [])

  console.log(field);
  console.log(id);
  console.log(conditionIdx);


  switch (field) {
    case 'optInDate':
      return (<OptInCondition id={id}  conditionIdx={conditionIdx}/>)
    case 'lastSession':
      return (<LastSessionCondition id={id} conditionIdx={conditionIdx} />)
    case 'sessionsCount':
      return (<SessionCountCondition id={id} conditionIdx={conditionIdx} />)
    case 'lang':
      return (<LanguageCondition id={id} conditionIdx={conditionIdx} />)
    case 'country':
      return (<CountryCondition id={id} conditionIdx={conditionIdx} />)
    case 'os':
      return (<OSCondition id={id}  conditionIdx={conditionIdx} />)
    case 'browser':
      return (<BrowserCondition id={id} conditionIdx={conditionIdx} />)

  }


}

export default Condition
