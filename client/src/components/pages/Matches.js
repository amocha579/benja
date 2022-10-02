import React, { Component } from 'react'
import Question from '../modules/Question.js'

import './Homepage.css'

class Matches extends Component {
  constructor(props) {
    super(props)
    // Initialize Default State
    this.state = {}
  }

  componentDidMount() {
    // remember -- api calls go here!
    fetch('/get_matches')
      .then(res => res.json())
      .then(data => {
        this.setState({ matches: data })
        console.log('Matches: ', this.state.matches)
      })
  }

  go = () => {
    this.props.getMatched()
  }

  render() {
    if (!this.state.matches) {
      return <h1 className="Homepage-title">Loading Matches...</h1>
    } else {
      // let questionList = []

      // for (const [key, val] of Object.entries(this.state.questions)) {
      //   //console.log([key, val]);
      //   questionList.push(
      //     <Question title={val['question']} answers={val['answers']} />
      //   )
      // }
      /*questionList = this.state.questions.map((q) => (
            <Question
              title={q.question}
              answers={q.answers}
            />
          ));*/

      return (
        <div className="homepage">
          <h1 className="Homepage-title">Matches</h1>
          {this.state.matches ? (
            <div>{this.state.matches}</div>
          ) : (
            <div>No matches :( You are too compatible with everyone :)</div>
          )}
        </div>
      )
    }
  }
}

export default Matches
