import React, {useState, useEffect, useReducer} from 'react';
import {useAuth} from '../../auth'
import {Container, Card, Button, CardTitle, CardText, Row, Col, FormGroup, Label, Input} from 'reactstrap'
import { toast } from 'react-toastify';



const Login = (props) => {

  console.log(useAuth());

  const {state, dispatch} = useAuth()

  const [email, setEmail] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')


  const register = () => {

    const user = {
      email,
      firstName,
      lastName,
      password
    }

    fetch('http://localhost:8000/api/users/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(user)
    })
    .then(res => res.json())
    .then(json => {
      if (!json.success) {
        toast.error(`${json.message}`)
      } else {
        dispatch({
          type: 'REGISTER',
          token: json.token,
        })
        toast.success('Logged In Successfully')
        props.history.push('/myapps')

      }
    })
  }



  return (
    <Container>
      <h1>Register</h1>
      <div className="mt-3">
        <Card body>
          <Row>
            <Col md={4}>
              <FormGroup>
                <Label>Email</Label>
                <Input type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
              </FormGroup>
            </Col>
            <Col md={4}>
              <FormGroup>
                <Label>First Name</Label>
                <Input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
              </FormGroup>
            </Col>
            <Col md={4}>
              <FormGroup>
                <Label>Last Name</Label>
                <Input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} />
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <FormGroup>
                <Label>Password</Label>
                <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
              </FormGroup>
            </Col>
            <Col md={6}>
              <FormGroup>
                <Label>Confrim Password</Label>
                <Input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
              </FormGroup>
            </Col>
          </Row>
        </Card>
        <Button className="mt-3" size="lg" style={{backgroundColor: '#00bf8c', borderColor: '#00bf8c'}} onClick={() => register()} disabled={((password.length > 6 && confirmPassword.length > 6)&&(password === confirmPassword)) ? false : true}>Register</Button>
      </div>

    </Container>
  )

}

export default Login
