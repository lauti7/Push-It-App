import React, {useReducer} from 'react';
import {Switch, Route} from 'react-router-dom';
import {AuthContext} from './auth'
import ProtectedRoute from './components/ProtectedRoute.js'
import MyApps from './components/MyApps'
import MyApp from './components/MyApp'
import Header from './components/Header'
import NewApp from './components/NewApp'
import NewMessage from './components/NewMessage'
import Messages from './components/Messages'
import Delivery from './components/Delivery'
import DeliverySchedule from './components/DeliverySchedule'
import Register from './components/Register'
import AppSegments from './components/AppSegments'
import NewSegment from './components/NewSegment'
import AppSubscribers from './components/AppSubscribers'
import Login from './components/Login'
import logo from './logo.svg';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


toast.configure();

const token = JSON.parse(localStorage.getItem("token"));

const initialState = {
  isAuthenticated: token ? true : false,
  token: token ? token : null,
}

function reducer(state, action) {
  switch (action.type) {
    case 'LOGIN':
      localStorage.setItem("token", JSON.stringify(action.token));
      localStorage.setItem("user", JSON.stringify(action.user));
      return {
        isAuthenticated: true,
        token: action.token,
      };
    case 'REGISTER':
      localStorage.setItem("token", JSON.stringify(action.token));
      return {
        isAuthenticated: true,
        token: action.token,
      };
    case 'LOGOUT':
      localStorage.clear();
      return {
        isAuthenticated: false,
        token: null,
      };
    case 'APPID':
      return {
        ...state,
        appId: action.appId
      }
    case 'SCHEDULEDATE':
      return {
        ...state,
        scheduleDate: action.scheduleDate
      }
    case 'INITNEWSEGMENT':
      return {
        ...state,
        addedOr: false,
        orCount: 0,
        conditions: [[]]
      }
    case 'ADD_OR':
      return {
        ...state,
        addedOr: true,
        orCount: state.orCount + 1,
        conditions: [...state.conditions, []]
      }
    case 'SAVECONDITION':
      console.log(action);
      let stateConditions = [...state.conditions]
      const idx = stateConditions[action.conditionIdx].findIndex(c => c.id === action.condition.id)
      console.log(idx);
      if (idx !== -1 && idx !== null) {
        let conditions = [...state.conditions[action.conditionIdx]]
        if (action.condition.operator) {
          conditions.splice(idx, 1, {...conditions[idx], operator:action.condition.operator })
        } else if(action.condition.value){
          conditions.splice(idx, 1, {...conditions[idx], value:action.condition.value })
        }
        let newConditions = [...state.conditions]
        newConditions.splice(action.conditionIdx, 1, conditions)
        return {
          ...state,
          conditions: [...newConditions]
        }
      }
      let newConditions = [...state.conditions[action.conditionIdx], action.condition]
      console.log(newConditions);
      console.log(stateConditions[action.conditionIdx]);
      stateConditions.splice(action.conditionIdx, 1, newConditions)
      return {
        ...state,
        conditions: [...stateConditions]
      }



  }

}

const App = () => {

  const [state, dispatch] = useReducer(reducer, initialState)

  return (
    <AuthContext.Provider value={{state, dispatch}}>
      <>
        <Header />
        <Switch>
          <Route exact path='/register' component={Register}/>
          <Route exact path='/login' component={Login}/>
          <ProtectedRoute exact path='/' component={MyApps}/>
          <ProtectedRoute exact path='/apps/:_id' component={MyApp}/>
          <ProtectedRoute exact path='/newapp' component={NewApp}/>
          <ProtectedRoute exact path='/apps/:_id/messages' component={Messages}/>
          <ProtectedRoute exact path='/apps/:_id/messages/new' component={NewMessage}/>
          <ProtectedRoute exact path='/apps/:_id/delivery/sent' component={Delivery}/>
          <ProtectedRoute exact path='/apps/:_id/delivery/schedule' component={DeliverySchedule}/>
          <ProtectedRoute exact path='/apps/:_id/segments' component={AppSegments}/>
          <ProtectedRoute exact path='/apps/:_id/segments/new' component={NewSegment}/>
          <ProtectedRoute exact path='/apps/:_id/subscribers' component={AppSubscribers}/>


        </Switch>
      </>
    </AuthContext.Provider>
  );
}


export default App;
