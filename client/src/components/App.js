import React, { Component } from 'react'
import NavBar from './modules/NavBar.js'
import { Router } from '@reach/router'
//import NotFound from "./pages/NotFound.js";
import Homepage from './pages/Homepage.js'
import Quiz from './pages/Quiz.js'
import Matches from './pages/Matches.js'
import Profile from './pages/Profile.js'
//import Location from "./pages/Location.js";
//import About from "./pages/About.js";
import { navigate } from '@reach/router'
import { gapi } from 'gapi-script'

//import "../utilities.css";

import { socket } from '../client-socket.js'

import { get, post } from '../utilities'
//import TagYourself from "./pages/TagYourself.js";

/**
 * Define the "App" component as a class.
 */
class App extends Component {
  // makes props available in this component
  constructor(props) {
    super(props)
    this.state = {
      userId: undefined,
    }
  }

  componentDidMount() {
    /*
    get("/api/whoami").then((user) => {
      if (user._id) {
        // they are registed in the database, and currently logged in.
        this.setState({
          userId: user._id,
        })
      }
    });
    */
  }

  getMatched = () => {
    /*post("/api/lastVisited", {lastVisited: newNumber}).then((user) => {
      console.log(user.name);
      this.setState({locationNumber: newNumber});
      console.log("here is updatelocationnumber: "+ this.state.locationNumber);
      navigate("/location/" + newNumber);
    });*/
    //navigate("/quiz");
    // this.setState({
    //   locationNumber: newNumber,
    // });
  }

  localStorageLogin = (name, email) => {
    localStorage.setItem("name", name);
    localStorage.setItem("email", email);
  }

  localStorageLogout = () => {
    localStorage.removeItem("name", null);
    localStorage.removeItem("email", null);
  }

  handleLogin = res => {
    console.log(`Logged in as ${res.profileObj.email}`)
    //const userToken = res.tokenObj.id_token
    this.setState({
      userEmail: res.profileObj.email,
      userName: res.profileObj.name,
    })
    this.localStorageLogin(this.state.userEmail, this.state.userName);
  }

  handleButtonLogin = () => {
    if (!this.getUser()){
      const GoogleAuth = gapi.auth2.getAuthInstance()
      GoogleAuth.signIn().then(e => {
        const profile = e.getBasicProfile()
        this.setState({
          userEmail: profile.getEmail(),
          userName: profile.getName(),
        })
        this.localStorageLogin(this.state.userEmail, this.state.userName);
      })
    }
    else{
      window.location.href += "quiz";
    }
  }

  getUser = () => this.state.userName || localStorage.getItem("name");

  handleLogout = () => {
    this.setState({
      userEmail: null,
      userName: null,
    })
    this.localStorageLogout();
    window.location.href = "/";
  }

  /*updateList = (newList) => {
    this.setState({
      list: newList,
    });
  };*/

  render() {
    if (this.state.loading) {
      return (
        <div>
          <NavBar
            handleLogin={this.handleLogin}
            handleLogout={this.handleLogout}
            userName={this.getUser()}
          />
          <Router>
            <Homepage path="/" userId={this.state.userId} />
          </Router>
        </div>
      )
    }
    return (
      <>
        <NavBar
          handleLogin={this.handleLogin}
          handleLogout={this.handleLogout}
          userName={this.getUser()}
        />
        <Router>
          <Homepage
            path="/"
            userId={this.getUser()}
            locationNumber={this.state.locationNumber}
            updateLocationNumber={this.updateLocationNumber}
            handleButtonLogin={this.handleButtonLogin}
          />
          <Quiz path="/quiz" userId={this.getUser()} />
          <Matches path="/matches" userId={this.getUser()} />
          <Profile path="/profile" userId={this.getUser()} />
        </Router>
      </>
    )
  }
}

/*

<TagYourself
            path="/TagYourself"
            userId={this.state.userId}
            listUpdate={this.updateList}
            updateLocationNumber={this.updateLocationNumber}
          /> 
          <About
            path="/about"
            userId={this.state.userId}
          />     
          <NotFound default />
          
<Location
            path="/location/:locationNumber"
            userId={this.state.userId}
            list={this.state.list}
            updateLocationNumber={this.updateLocationNumber}
          />
          <TagYourself
            path="/TagYourself"
            userId={this.state.userId}
            listUpdate={this.updateList}
            updateLocationNumber={this.updateLocationNumber}
          />  
          <About
            path="/about"
            userId={this.state.userId}
          />     
          <NotFound default />
          */

export default App

/*import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;*/
