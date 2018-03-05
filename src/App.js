import React from 'react'
import { render } from 'react-dom'
import Login from './components/Login/LoginSection'
import Signup from './components/SignupForm/SignUp'
import Recipe from './components/Recipes/RecipeComponent'
import Food from './components/Food/FoodComponent'
import Profil from './components/Profils/Profil'
import Home from './components/Home/Home'
import NewRecipe from './components/Recipes/NewRecipe'
import ReactDOM from 'react-dom'
import { 
    BrowserRouter as Router,
    Route,
    Link,
    Switch,
    withRouter,
    Redirect
} from 'react-router-dom'

export const fakeAuth = {
    isAuthenticated: false,
    authenticate(cb) {
      this.isAuthenticated = true
      setTimeout(cb, 100)
    },
    signout(cb) {
      this.isAuthenticated = false
      setTimeout(cb, 100)
    }
  };
  
  const AuthButton = withRouter(
    ({ history }) =>
      fakeAuth.isAuthenticated ? (
        <p>
          Welcome!{''}
          <button
            onClick={() => {
              fakeAuth.signout(() => history.push('/'))
            }}
          >
            Sign out
          </button>
        </p>
      ) : (
        <p>You are not logged in.</p>
      )
  )
  
  const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route
      {...rest}
      render={props =>
        fakeAuth.isAuthenticated ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: '/login',
              state: { from: props.location }
            }}
          />
        )
      }
    />
  )

class App extends React.Component {
  render() {

    return (
      <div>  
        <nav className='navbar navbar-default'>
          <div className='navbar-header'>
            <a className='navbar-brand' href='#'>My react app</a>
          </div>
          <ul className='nav navbar-nav'>
            <li><Link to='/login'>Login</Link></li>
            <li><Link to='/signup'>Signup</Link></li>
            <li><Link to='/home'>Home</Link></li>
            <li><Link to='/recipes'>Recipes</Link></li>
            <li><Link to='/recipe'>New recipes</Link></li>
            <li><Link to='/food'>New food</Link></li>
            <li><Link to='/profil'>Profil</Link></li>
          </ul>        
        </nav> 
            
      <Switch>
        <Route path='/login' component={Login} />
        <Route path='/signup' component={Signup} />
        <Route exact path='/home' component={Home} />
        <PrivateRoute path='/recipes' component={Recipe} />
        <Route path='/recipe' component={NewRecipe} />
        <Route path='/food' component={Food} />
        <Route path='/profil' component={Profil} />
      </Switch> 
            
      </div>     
    )
  }  
}     
    
export default App