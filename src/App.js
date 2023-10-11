import {Route, Switch} from 'react-router-dom'
import './App.css'
import Home from './components/Home'
import Login from './components/Login'
import QuizPage from './components/QuizPage'
import Result from './components/Result'

const App = () => (
  <>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/login" component={Login} />
      <Route exact path="/quiz" component={QuizPage} />
      <Route exact path="/result/:id" component={Result} />
    </Switch>
  </>
)
export default App
