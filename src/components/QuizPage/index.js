import './index.css'
import {Component} from 'react'
import {Redirect} from 'react-router-dom'

class QuizPage extends Component {
  state = {quiz: [], curr: 0, correct: '', score: 0}

  componentDidMount() {
    this.fetchQuestions()
  }

  fetchQuestions = async () => {
    const url = 'http://localhost:3002/api/fetchQuestions'
    const options = {
      method: 'GET',
    }
    const response = await fetch(url, options)
    const data = await response.json()
    const updateData = data.map(item => ({
      id: item.id,
      question: item.text,
      options: item.options.map(eachItem => ({
        textOption: eachItem.text,
        correct: eachItem.is_correct,
        questionId: eachItem.question_id,
      })),
    }))

    if (response.ok === true) {
      this.setState({quiz: updateData})
    }
  }

  getCorrectOption = event => {
    const selectedOption = event.target.value
    const {curr, quiz} = this.state
    const updatedQuiz = [...quiz]
    updatedQuiz[curr].options = updatedQuiz[curr].options.map(option => ({
      ...option,
      selected: option.textOption === selectedOption,
    }))
    this.setState({correct: selectedOption, quiz: updatedQuiz})
  }

  checkAnswer = () => {
    const {correct, curr, quiz} = this.state
    const answer = quiz[curr].options // selecting correct answer from current question
    const resAns = answer.filter(eachItem => eachItem.correct === 1)
    console.log(resAns)
    if (correct === resAns[0].textOption) {
      this.setState(prevState => ({
        score: prevState.score + 5,
      }))
    }
    if (curr < quiz.length) {
      this.setState(prevState => ({
        curr: prevState.curr + 1,
        correct: '', // Reset selected answer when moving to the next question
      }))
    }
  }

  render() {
    const {quiz, curr, score} = this.state
    const res = quiz[curr]
    if (curr >= 5) {
      return <Redirect to={`/result/${score}`} />
    }

    return (
      <div className="quiz-bg">
        <h1 className="q-h">
          Score: <span className="sp">{score}</span>
        </h1>
        {res !== undefined ? (
          <div className="options">
            <p className="que">{res.question}</p>
            {res.options.map(item => (
              <div key={item.textOption}>
                <label htmlFor={item.textOption} className="label">
                  <input
                    type="radio"
                    id={item.textOption}
                    value={item.textOption}
                    name={`fav_${curr}`}
                    checked={item.selected} // Check if this option is selected
                    onChange={this.getCorrectOption}
                    className="op"
                  />
                  {item.textOption}
                </label>
              </div>
            ))}
            <button
              type="button"
              className="but-sum"
              onClick={this.checkAnswer}
            >
              Submit
            </button>
          </div>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    )
  }
}

export default QuizPage
