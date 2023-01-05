import React, { Fragment } from 'react'
import SignUpForm from '../../components/sign-up-form/sign-up-form';
import SignInForm from '../../components/sign-in-form/sign-in-form';
import { Container, Row } from "react-bootstrap";
import './sign-in.css'

function SignIn() {

  
  return (
    <Fragment>

    <Container className='d-flex mt-5'>
    <Row className='m-auto align-self-center col-12 col-md-10 col-xxl-8'>
    <div className='glassForm'>
    <div className='cr__signUp-container'>
      <div className='cr__signIn-title'>
        <h1>Sign Up</h1>
      </div>
      <div className='cr__signIn-form'>
        <SignUpForm/>
      </div>
      </div>
      <div className='cr__signIn-container'>
      <div className='cr__signIn-title'>
        <h2>Sign In</h2>
      </div>
      <SignInForm/>
      </div>
    </div>
    
    </Row>
    </Container>
    </Fragment>
  )
}

export default SignIn