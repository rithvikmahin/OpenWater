import React, { Component } from "react";
import { signin } from "../helpers/auth";
import '../assets/css/main.css';
import {
  Container, Form, Row, Col, 
  FormGroup, Input,
  Button
} from 'reactstrap';


export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      universityEmail: "",
      password: ""
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
    this.setState({ error: "" });
    try {
      await signin(this.state.universityEmail, this.state.password);
    } catch (error) {
      this.setState({ error: error.message });
    }
  }

  render() {
    return (
       <Container>
          <div className='image-container'>
            <img src={ require('../assets/images/Logo.png') } alt='' className='image-banner' />
          </div>

          <Form autoComplete="off" onSubmit={this.handleSubmit}>
            <Row>
              <Col sm="12" md={{ size: 10, offset: 3}}>
                <FormGroup>
                  <Input className="form-control" placeholder="University Email" name="universityEmail" onChange={this.handleChange} value={this.state.universityEmail} type="text"/>
                </FormGroup>
              </Col>
            </Row>

            <p></p>

            <Row >
              <Col sm="12" md={{ size: 10, offset: 3}}>
                <FormGroup>
                  <Input className="form-control" placeholder="Password" name="password" onChange={this.handleChange} value={this.state.password} type="password"/>
                </FormGroup>
              </Col>
            </Row>

            <p></p>

            <Row >
              <Col sm="10" md={{ size: 6, offset: 4}}>
                <FormGroup>
                  {this.state.error ? <p className="text-danger">{this.state.error}</p> : null}
                  <Button className="sign-in" type="submit" onClick={this.handleSubmit}><span className='sign-in-font'>SIGN IN</span></Button>
                </FormGroup>
              </Col>
            </Row>
          </Form>
        </Container>
    );
  }
}