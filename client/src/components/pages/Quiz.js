import React, { Component } from "react";
import Question from "../modules/Question.js";

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

    putInfoIntoDatabase = (event) => {
      const city_list = this.generateList();
      get("/api/whoami").then((user) => {
        if (user.cities !== city_list){
          post("/api/tags_and_cities", {tags: this.state.tags, cities: city_list}).then(
            () => this.props.listUpdate(city_list)
          ).then(
            () => {
               console.log(this.state.tags);
                this.setState({ 
                  locationNumber: 0,
                });
                this.props.updateLocationNumber(0);
                //navigate("/location/" + user.lastVisited);
              });
        } else {
          this.setState({ 
            locationNumber: user.lastVisited,
          });
          if (this.state.locationNumber === undefined || this.state.locationNumber === null) {
            this.props.updateLocationNumber(0);
          } else {
            this.props.updateLocationNumber(user.lastVisited);
          }
        }
      }
    )}

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
            </div>
          );
        }
    }
  }
  
  export default Quiz;