import React, {useEffect} from 'react'
import OptInCondition from './OptInCondition'
import LastSessionCondition from './LastSessionCondition'
import SessionCountCondition from './SessionCountCondition'
import LanguageCondition from './LanguageCondition'
import CountryCondition from './CountryCondition'
import OSCondition from './OSCondition'
import BrowserCondition from './BrowserCondition'




const Condition = ({field, id}) => {

  useEffect(() => {
    console.log('Mounted Condition');
  }, [])

  switch (field) {
    case 'optInDate':
      return (<OptInCondition id={id} />)
    case 'lastSession':
      return (<LastSessionCondition id={id}  />)
    case 'sessionCount':
      return (<SessionCountCondition id={id} />)
    case 'lang':
      return (<LanguageCondition id={id}  />)
    case 'country':
      return (<CountryCondition id={id} />)
    case 'os':
      return (<OSCondition id={id}  />)
    case 'browser':
      return (<BrowserCondition id={id}  />)

  }


}

export default Condition
