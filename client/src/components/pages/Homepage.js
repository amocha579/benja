import React, { Component } from 'react'
import logo from '../../logo.png'
import cat from '../../download.jpeg'

//import "../../utilities.css";
import './Homepage.css'

class Homepage extends Component {
  constructor(props) {
    super(props)
    // Initialize Default State
    this.state = {}
    this.data = null
  }

  componentDidMount() {
    // remember -- api calls go here!
    fetch('/test_api')
      .then(res => res.json())
      .then(data => {
        console.log('HERE: ', data)
        this.data = data.message
      })
  }

  go = () => {
  }

  render() {
    if (this.props.userName) {
      return (
        <div className="homepage">
          <div className="Homepage-image-container">
            <img src={'https://ibb.co/ZY3xVhs'} />
          </div>
          <h1 className="Homepage-main-title">Do Opposites Attract?</h1>
          <div>
            <p className="Homepage-text-container">
              Find your "least compatible" BFF!
              <br />
              <br />
            </p>
          </div>
          <div className="Homepage-button-container" onClick={() => this.go()}>
            <div className="Homepage-button">
              <span className="Homepage-button-title">Get Matched</span>
            </div>
          </div>
        </div>
      )
    } else {
      return (
        <div className="homepage">
          <div className="Homepage-image-container">
            <img src={logo} alt="ice cream" />
          </div>
          <h1 className="Homepage-main-title">Do Opposites Attract?</h1>
          <p className="Homepage-text-container">
            Find your "least compatible" BFF!
            <br />
            <br />
          </p>
          <div className="Homepage-button-container" onClick={() => this.props.handleButtonLogin()}>
            <div className="Homepage-button">
              <span className="Homepage-button-title">Get Matched</span>
            </div>
          </div>
        </div>
      )
    }
  }
}

export default Homepage
