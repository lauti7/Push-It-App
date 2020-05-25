import React, {useState, useEffect} from 'react';
import {useAuth} from '../../auth'
import {Container, Card, Button, CardTitle, CardText, Row, Col, FormGroup, Label, Input} from 'reactstrap'
import { toast } from 'react-toastify';

const Login = (props) => {

    const {state, dispatch} = useAuth()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')


    const login = () => {

      const user = {
        email,
        password
      }

      fetch('http://localhost:8000/api/users/login', {
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
            type: 'LOGIN',
            token: json.token,
          })
          toast.success('Logged In Successfully')
          props.history.push('/myapps')

        }
      })
    }



    return (
      <Container>
        <h1>Log in</h1>
        <div className="mt-3">
          <Card body>
            <Row>
              <Col md={6}>
                <FormGroup>
                  <Label>Email</Label>
                  <Input type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
                </FormGroup>
              </Col>
              <Col md={6}>
                <FormGroup>
                  <Label>Password</Label>
                  <Input type="text" value={password} onChange={(e) => setPassword(e.target.value)} />
                </FormGroup>
              </Col>
            </Row>
          </Card>
          <Button className="mt-3" size="lg" style={{backgroundColor: '#00bf8c', borderColor: '#00bf8c'}} onClick={() => login()}>Login</Button>
        </div>

      </Container>
    )
}

export default Login
