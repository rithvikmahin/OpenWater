import React, { Component } from 'react';
import '../assets/css/main.css';
import { signup } from "../helpers/auth";
import { db } from "../components/Firebase/firebase";
import {
  Container, Col, Form,
  FormGroup, Input,
  Button,
  Row
} from 'reactstrap';

export default class SignUp extends Component {

  constructor() {
    super();
    this.state = {
      error: null,
      firstName: '',
      lastName: '',
      graduateYear: '',
      studyField: '',
      university: '',
      universityEmail: '',
      city: '',
      timeZone: '',
      password: '',
      confirmPassword: ''
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  async handleSubmit(event) {
    event.preventDefault();
    this.setState({ error: '' });
    console.log(this.state);
    try {
      await signup(this.state.universityEmail, this.state.password);
    } catch (error) {
      this.setState({ error: error.message });
    }
    const ref = db.ref('students');
    await ref.push({'s4' : this.state});
  }

  render() {
    return (
      <Container> 
        <div className='image-container'>
              <img src={ require('../assets/images/Logo.png') } alt='' className='image-banner' />
        </div>
        <div className='form-container'>
        
        <Form className="form">
          <Row className='no-gutters'> 
            <Col >
              <FormGroup>
                <Input className="form-control" placeholder="First Name" name="firstName" type="text" onChange={this.handleChange} value={this.state.firstName}/>
              </FormGroup>
            </Col>
            <Col>
              <FormGroup>
                <Input className="form-control" placeholder="Last Name" name="lastName" onChange={this.handleChange} value={this.state.lastName} type="text"/>
              </FormGroup>
            </Col>
          </Row>

          <Row className='no-gutters'>
            <Col>
              <FormGroup>
                <Input className="form-control" placeholder="Graduating Year" name="graduateYear" onChange={this.handleChange} value={this.state.graduateYear} type="text"/>
              </FormGroup>
            </Col>
            <Col>
              <FormGroup>
                <Input className="form-control" placeholder="Field of Study" name="studyField" onChange={this.handleChange} value={this.state.studyField} type="text"/>
              </FormGroup>
            </Col>
          </Row>

          <Row className='no-gutters'>
            <Col>
              <FormGroup>
                <Input className="form-control" placeholder="University" name="university" onChange={this.handleChange} value={this.state.university} type="text"/>
              </FormGroup>
            </Col>
            <Col>
              <FormGroup>
                <Input className="form-control" placeholder="University Email" name="universityEmail" onChange={this.handleChange} value={this.state.universityEmail} type="email"/>
              </FormGroup>
            </Col>
          </Row>

          <Row className='no-gutters'>
            <Col>
              <FormGroup>
                <Input className="form-control" placeholder="Current City" name="city" onChange={this.handleChange} value={this.state.city} type="text"/>
              </FormGroup>
            </Col>
            <Col>
              <FormGroup>
                <Input className="form-control" placeholder="Time Zone" name="timeZone" onChange={this.handleChange} value={this.state.timeZone} type="text"/>
              </FormGroup>
            </Col>
          </Row>

          <Row className='no-gutters'>
            <Col>
              <FormGroup>
                <Input className="form-control" placeholder="Password" name="password" onChange={this.handleChange} value={this.state.password} type="password"/>
              </FormGroup>
            </Col>
            <Col>
              <FormGroup>
                <Input className="form-control" placeholder="Confirm Password" name="confirmPassword" onChange={this.handleChange} value={this.state.confirmPassword} type="password"/>
              </FormGroup>
            </Col>
          </Row>

          <p></p>
          
          <Row >
              <Col sm="10" md={{ size: 6, offset: 3}}>
                <FormGroup>
                  {this.state.error ? <p className="text-danger">{this.state.error}</p> : null}
                  <Button className="sign-up" type="submit" onClick={this.handleSubmit}><span className='sign-up-font'>SIGN UP</span></Button>
                </FormGroup>
              </Col>
            </Row>
        </Form>
        </div>
      </Container>
    )
  }
}