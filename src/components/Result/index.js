import './index.css'
import {Link} from 'react-router-dom'

const Result = props => {
  const {match} = props
  const {params} = match
  const {id} = params
  return (
    <div className="res-bg">
      <div className="score-card">
        <h1>Your score</h1>
        <p className="res-score">{id}</p>
        {id < 25 ? <p>Try ones more!!</p> : <p>You did it!</p>}
        <Link to="/">
          <button className="but" type="button">
            Attempt Again
          </button>
        </Link>
      </div>
    </div>
  )
}
export default Result
