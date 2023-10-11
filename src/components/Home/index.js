// Write your JS code here
import './index.css'
import Cookies from 'js-cookie'
import {Redirect, Link} from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.css'

const Home = () => {
  const jwtToken = Cookies.get('jwt_token')
  if (jwtToken === undefined) {
    return <Redirect to="/login" />
  }
  return (
    <>
      <div className="container-fluid home-bg">
        <div className="row">
          <h1 className="head1">Complete the Quiz</h1>
          <ul className="inst">
            <p className="p">Instructions:</p>
            <li>Read the question correctly</li>
            <li>Every question have multiple options</li>
            <li>Select any one option to submit</li>
            <li>For every correct answer you will get 5 points</li>
            <li>
              There is no negative marking for wrong response with 0 points
            </li>
          </ul>
          <Link to="/quiz">
            <button type="button" className="start">
              Start
            </button>
          </Link>
        </div>
      </div>
    </>
  )
}

export default Home
