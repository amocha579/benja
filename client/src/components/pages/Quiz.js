import React, { Component } from "react";
import "./Homepage.css";

class Quiz extends Component {
    constructor(props) {
      super(props);
      // Initialize Default State
      this.state = {};
      this.questions = null;
    }
  
    componentDidMount() {
      // remember -- api calls go here!
      fetch("/get_questions")
        .then((res) => res.json())
        .then((data) => {
          this.setState({"questions": data});
          console.log("Questions: ",this.state);
        });
    }
  
    go = () => {
      this.props.getMatched();
    }

    render() {
        if (!this.state.questions) {
            return  <h1 className="Homepage-title">Loading Quiz...</h1>
        }
        else{
        return (
          <div className="homepage">
            <div className="Homepage-image-container">
              <div className="Homepage-image"/>
            </div>
            <h1 className="Homepage-title">Opposites Quiz</h1>
            <div >
              <p className="Homepage-text-container">Some text</p>
            </div>
          </div>
        );
        }
    }
  }
  
  export default Quiz;