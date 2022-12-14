import React, { Component } from 'react'
//import { Link } from "@reach/router";
import GoogleLogin, { GoogleLogout } from 'react-google-login'
//import { get, post } from "../../utilities";

import './NavBar.css'
//import TagYourself from "../pages/TagYourself";
//import EditTags from "./EditTags";

import { gapi } from 'gapi-script'

//import { get, post } from "../../utilities";

// This identifies your application to Google's authentication service
const GOOGLE_CLIENT_ID =
  '188648922433-9me6dk1gfkdj5h54fpegs38tk1kga5ob.apps.googleusercontent.com'

gapi.load('client:auth2', () => {
  gapi.client.init({ clientId: GOOGLE_CLIENT_ID, plugin_name: 'chat' })
})

// const toggleButton = document.getElementsByClassName("toggle-button")[0];
// const navbarLinks = document.getElementsByClassName("NavBar-links")[0];

// toggleButton.addEventListener('click', () => {
//   navbarLinks.classList.toggle('active');
// });

/**
 * The navigation bar at the top of all pages. Takes no props.
 */

class NavBar extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    return (
      <nav className="NavBar-container">
        <div className="NavBar-title">
          <a className="NavBar-title-link" href="/">
            {' '}
            Opposites Attract
          </a>
        </div>
        <div className="NavBar-title">
          <a className="NavBar-title-link" href="/quiz">
            {' '}
            Take Quiz
          </a>
        </div>
        <div className="NavBar-title">
          <a className="NavBar-title-link" href="/matches">
            {' '}
            Matches
          </a>
        </div>
        <div className="NavBar-title">
          <a className="NavBar-title-link" href="/profile">
            {' '}
            Profile
          </a>
        </div>

        <div className="NavBar-links">
          {this.props.userName ? (
            <GoogleLogout
              clientId={GOOGLE_CLIENT_ID}
              buttonText="Logout"
              onLogoutSuccess={this.props.handleLogout}
              onFailure={err => console.log(err)}
              className="NavBar-link NavBar-login"
            />
          ) : (
            <GoogleLogin
              clientId={GOOGLE_CLIENT_ID}
              buttonText="Login"
              prompt="consent"
              onSuccess={this.props.handleLogin}
              onFailure={err => console.log(err)}
              className="NavBar-link NavBar-login"
            />
          )}
        </div>

        {/* 
        <div className="NavBar-about">
            <a className="NavBar-link" href="/about">about</a>
          </div>

        <EditTags loggedIn={this.props.userId}> </EditTags>
        
        <div className="navbar">
        <img
          className="hamburger"
          alt="hamburger menu"
          // src="IMAGE SOURCE HERE"
          onClick={() => setShowMenu(true)}
        />
        <div className={`menu ${showMenu && "show"}`}>
          <div className="close" onClick={() => setShowMenu(false)}>
            close menu
          </div>
          <div className="ignore">link one</div>
          <div className="ignore">link two</div>
        </div>
      </div> */
        /*<div className="toggle-button" onClick={()=> this.setShowMenu()}>
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </div>
        <div className="Navbar-menu-container">
          <div className={`${this.state.showMenu ? "menu-show": "menu-hide"}`}>
            <a className="Navbar-Hamb" href="/about">About</a>
            
          </div>
        </div>
         */}
      </nav>
    )
  }
}

export default NavBar
