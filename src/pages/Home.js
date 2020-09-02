import React, { Component } from 'react';
import { withRouter } from 'react-router-dom'; 
import '../assets/css/main.css';
import {
  Container, Col, Form,
  Button, Row
} from 'reactstrap';

class HomePage extends Component {

  onSignUp (e) {
    e.preventDefault()
    this.props.history.push('/signup'); 
  }

  onSignIn (e) {
    e.preventDefault()
    this.props.history.push('/login'); 
  }

  render() {
    return (
      <div className="home">
        <section>
          <div >
            <div className="container text-center py-5">
                <div className='image-container'>
                  <img src={ require('../assets/images/Logo.png') } alt='Clinque' className='image-banner' />
                </div>
                <Container>
                  <Row>
                    <Col>
                      <Form className="form" onSubmit={this.onSignUp.bind(this)}>
                        <Button className="sign-up" type='submit'><span className='sign-up-font'>SIGN UP</span></Button>
                      </Form>
                    </Col>
                
                    <Col>
                      <Form className="form" onSubmit={this.onSignIn.bind(this)}>
                        <Button className="sign-in" type="submit"><span className='sign-in-font'>SIGN IN</span></Button>
                      </Form>
                    </Col>
                  </Row>
                </Container>
              </div>
          </div>
        </section>
      </div>
    )
  }
}

export default withRouter(HomePage);