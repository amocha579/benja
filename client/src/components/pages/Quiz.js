import React, { Component } from "react";
import Question from "../modules/Question.js";

import "./Homepage.css";
import { get, post } from "../../utilities.js";

const listOfAnswers = [];

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

    putInfoIntoDatabase = (event) => {
      /*get("/api/whoami").then((user) => {
        if(user) {
          post("/api/questionAnswer", {user: user, answers: listOfAnswers});
        }
        
      }*/
      post("/api/questionAnswer", {user: {_id: "63399f16067de7b44ccdc09d", name: "hiiii"}, answers: listOfAnswers});
    }

    render() {
        if (!this.state.questions) {
          return  <h1 className="Homepage-title">Loading Quiz...</h1>
        }
        else{
          let questionList = [];

          for (const [key, val] of Object.entries(this.state.questions)) {
            //console.log([key, val]);
            questionList.push(
            <Question 
              number={key}
              title={val["question"]}
              answers={val["answers"]}
              listChoices={listOfAnswers}
            />);
          }
          /*questionList = this.state.questions.map((q) => (
            <Question
              title={q.question}
              answers={q.answers}
            />
          ));*/

          return (
            <div className="homepage">
              <div className="Homepage-image-container">
                <div className="Homepage-image"/>
              </div>
              <h1 className="Homepage-title">Opposites Quiz</h1>
              <div >
                {questionList}
              </div>
              <div >
                <span  
                  onClick={() => this.putInfoIntoDatabase()}>
                  GO!
                </span>
              </div>
            </div>
          );
        }
    }
  }
  
  export default Quiz;