import React, { Component } from "react";

//import "../../utilities.css";
import "./Homepage.css";

class Homepage extends Component {
    constructor(props) {
      super(props);
      // Initialize Default State
      this.state = {};
    }
  
    componentDidMount() {
      // remember -- api calls go here!
    }
  
    go = () => {
      this.props.getMatched();
    }

    render() {
      if (this.props.userId){
        return (
          <div className="homepage">
            <div className="Homepage-image-container">
              <div className="Homepage-image"/>
            </div>
            <h1 className="Homepage-title">Do Opposites Attract?</h1>
            <div >
              <p className="Homepage-text-container">Tired of being stuck at home? We have a solution! Enjoy on a virtual vacation tailored to your interests... <br /> <br />
              You're already logged in, so click GO! to travel back to your first location! <br /> To edit your tags, click "edit tags" above.</p>
            </div>
            <div className="Homepage-GO-container" onClick={() => this.go()}>
                <div className="Homepage-GO-button">
                    <span className="Homepage-GO-title">
                        Get Matched!
                    </span>
                </div>
            </div>
          </div>
        );
      } else {
        return (
          <div className="homepage">
            <div className="Homepage-image-container">
              <div className="Homepage-image"/>
            </div>
            <h1 className="Homepage-title">Do Opposites Attract?</h1>
            <div >
              <p className="Homepage-text-container">Ever wondered if opposites do attract?<br /> <br />
              Simply LOG IN, TAG your interests, and GO!</p>
            </div>
          </div>
        );
      }
    }
  }
  
  export default Homepage;