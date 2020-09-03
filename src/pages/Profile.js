import React, { Component } from 'react';
import '../assets/css/main.css'
import { profile } from "../helpers/auth";

export default class Profile extends Component {

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
    try {
      await profile(this.state.email, this.state.password);
    } catch (error) {
      this.setState({ error: error.message });
    }
  }

  render() {
    return (
      <div className="container">
        <form className="mt-5 py-5 px-5" style={{margin: 'auto'}} onSubmit={this.handleSubmit}>
        
          <div className='image-container'>
              <img src={ require('../assets/images/Logo.png') } alt='' className='center' />
          </div>

          <div className="form-group">
            <input className="form-control" placeholder="First Name" name="firstName" type="text" onChange={this.handleChange} value={this.state.firstName}></input>
          </div>
          <div className="form-group">
            <input className="form-control" placeholder="Last Name" name="lastName" onChange={this.handleChange} value={this.state.lastName} type="text"></input>
          </div>
          <div className="form-group">
            <input className="form-control" placeholder="Graduating Year" name="graduateYear" onChange={this.handleChange} value={this.state.graduateYear} type="text"></input>
          </div>
          <div className="form-group">
            <input className="form-control" placeholder="Field of Study" name="studyField" onChange={this.handleChange} value={this.state.studyField} type="text"></input>
          </div>
          <div className="form-group">
            <input className="form-control" placeholder="University" name="university" onChange={this.handleChange} value={this.state.university} type="text"></input>
          </div>
          <div className="form-group">
            <input className="form-control" placeholder="University Email" name="universityEmail" onChange={this.handleChange} value={this.state.universityEmail} type="email"></input>
          </div>
          <div className="form-group">
            <input className="form-control" placeholder="Current City" name="city" onChange={this.handleChange} value={this.state.city} type="text"></input>
          </div>
          <div className="form-group">
            <input className="form-control" placeholder="Time Zone" name="timeZone" onChange={this.handleChange} value={this.state.timeZone} type="text"></input>
          </div>
          <div className="form-group">
            <input className="form-control" placeholder="Password" name="password" onChange={this.handleChange} value={this.state.password} type="password"></input>
          </div>
          <div className="form-group">
            <input className="form-control" placeholder="Confirm Password" name="confirmPassword" onChange={this.handleChange} value={this.state.confirmPassword} type="password"></input>
          </div>

          <div className="form-group">
            {this.state.error ? <p className="text-danger">{this.state.error}</p> : null}
            <button className="sign-up" type="submit"><span className='sign-up-font'>SIGN UP</span></button>
          </div>
        </form>
      </div>
    )
  }
}