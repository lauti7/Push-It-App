import React from 'react'
import {Route, Redirect} from 'react-router-dom'
import {useAuth} from '../../auth'

const ProtectedRoute = ({component: Component, ...rest}) => {
  const {state} = useAuth()
  return (
    <Route
      {...rest}
      render={
        props => {
          if(state.isAuthenticated){
            return <Component {...props} />
          } else {
            return <Redirect
                to={{
                  pathname:'/login'
                }}
             />
          }
        }
      }


    />

  )
}

export default ProtectedRoute
