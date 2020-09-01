import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../assets/css/main.css'

export default class HomePage extends Component {
  render() {
    return (
      <div className="home">
        <section>
          <div className="jumbotron jumbotron-fluid py-5">
            <div className="container text-center py-5">
                <div className='image-container'>
                  <img src={ require('../assets/images/Logo.png') } alt='' className='center' />
                </div>
                
                  <div className='button-container'>
                    <Link className="sign-up" to="/signup"><span className="sign-up-font">SIGN UP</span></Link>
                    <Link className="sign-in" to="/login"><span className="sign-in-font">SIGN IN</span></Link>
                  </div>

              </div>
          </div>
        </section>
      </div>
    )
  }
}