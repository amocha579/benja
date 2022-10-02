import React, { Component } from 'react'
import Question from '../modules/Question.js'

import './Homepage.css'

class Quiz extends Component {
  constructor(props) {
    super(props)
    // Initialize Default State
    this.state = {}
    this.questions = null
  }

  componentDidMount() {
    // remember -- api calls go here!
    fetch('/get_questions')
      .then(res => res.json())
      .then(data => {
        this.setState({ questions: data })
        console.log('Questions: ', this.state)
      })
  }

  go = () => {
    this.props.getMatched()
  }

  render() {
    if (!this.state.questions) {
      return <h1 className="Homepage-title">Loading Quiz...</h1>
    } else {
      let questionList = []

      for (const [key, val] of Object.entries(this.state.questions)) {
        //console.log([key, val]);
        questionList.push(
          <Question title={val['question']} answers={val['answers']} />
        )
      }
      /*questionList = this.state.questions.map((q) => (
            <Question
              title={q.question}
              answers={q.answers}
            />
          ));*/

      return (
        <div className="homepage">
          <h1 className="Homepage-title">Opposites Quiz</h1>
          <div>{questionList}</div>
        </div>
      )
    }
  }
}

export default Quiz
