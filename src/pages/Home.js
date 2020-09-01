import React, { Component } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Link } from 'react-router-dom';
import '../assets/css/home.css'

export default class HomePage extends Component {
  render() {
    return (
      <div className="home">
        <Header></Header>
        <section>
          <div className="jumbotron jumbotron-fluid py-5">
            <div className="container text-center py-5">
                <div className='image-container'>
                  <img src={ require('../assets/images/Logo.png') } className='center' />
                </div>
              <div className="mt-4">
                <Link className="sign-up" to="/signup"><span className="sign-up-font">SIGN UP</span></Link>
                <Link className="sign-in" to="/login"><span className="sign-in-font">SIGN IN</span></Link>
              </div>
            </div>
          </div>
        </section>
        <Footer></Footer>
      </div>
    )
  }
}