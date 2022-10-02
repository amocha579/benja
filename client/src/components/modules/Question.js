import React, { Component } from 'react'

import './Question.css'

/**
 * Story is a component that renders creator and content of a story
 *
 * Proptypes
 * @param {string} question title
 * @param {string[]} answers array of answer choices
 */
class Question extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    let answerString = []
    for (let i = 0; i < this.props.answers.length; i++) {
      answerString.push(
        <p className="Question-option u-inline">{this.props.answers[i]}</p>
      )
    }

    return (
      <div className="Question-box">
        <h4 className="Question-title u-inline"> {this.props.title} </h4>

        {answerString}
      </div>
    )
  }
}

export default Question
