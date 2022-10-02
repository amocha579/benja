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
    this.props.getMatched()
  }

  render() {
    if (this.props.userId) {
      return (
        <div className="homepage">
          <div className="Homepage-image-container">
            {/* <div className="Homepage-image" /> */}
            {/* <img src={require('../../logo.png')} /> */}
            {/* <img src={logo} alt="ice cream" /> */}
            <img src={'https://ibb.co/ZY3xVhs'} />
          </div>
          <h1 className="Homepage-title">Do Opposites Attract?</h1>
          <div>
            <p className="Homepage-text-container">
              The world is becoming increasingly divided, but hey! they say
              opposites attract.
              <br />
              Come put that to the test with our new machine-learning (ML) and
              natural language processing (NLP) algorithm that will match you to
              your “least compatible” person.
              <br />
              Who knows? They may be your next BFF!
              <br />
              <br />
            </p>
          </div>
          <div className="Homepage-GO-container" onClick={() => this.go()}>
            <div className="Homepage-GO-button">
              <span className="Homepage-GO-title">Get Matched</span>
            </div>
          </div>
        </div>
      )
    } else {
      return (
        <div className="homepage">
          <div className="Homepage-image-container">
            <div className="Homepage-image" />
          </div>
          <h1 className="Homepage-title">Do Opposites Attract?</h1>
          <p className="Homepage-text-container">
            Find your next "least compatible" BFF!
            <br />
            <br />
          </p>
          <div className="Homepage-GO-container" onClick={() => this.go()}>
            <div className="Homepage-GO-button">
              <span className="Homepage-GO-title">Get Matched</span>
            </div>
          </div>
        </div>
      )
    }
  }
}

export default Homepage
