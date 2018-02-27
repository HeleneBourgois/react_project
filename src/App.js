import React from 'react'
import { render } from 'react-dom'
import Login from './components/Login/LoginSection'
import Recipe from './components/Recipes/RecipeComponent'
import Profil from './components/Profils/Profil'
import Home from './components/Home/Home'
// import PrivateRoute from './components/Login/PrivateComponent'
// import RecipeDetail from './components/Recipes/RecipeDetailComponent'
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
      this.isAuthenticated = true;
      setTimeout(cb, 100); // fake async
    },
    signout(cb) {
      this.isAuthenticated = false;
      setTimeout(cb, 100);
    }
  };
  
  const AuthButton = withRouter(
    ({ history }) =>
      fakeAuth.isAuthenticated ? (
        <p>
          Welcome!{" "}
          <button
            onClick={() => {
              fakeAuth.signout(() => history.push("/"));
            }}
          >
            Sign out
          </button>
        </p>
      ) : (
        <p>You are not logged in.</p>
      )
  );
  
  const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route
      {...rest}
      render={props =>
        fakeAuth.isAuthenticated ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: props.location }
            }}
          />
        )
      }
    />
  )

const App = appProps => (
    <Router>
    <nav className="navbar navbar-default">
        <div className="App">
        <div className="navbar-header">
            <a className="navbar-brand" href="#">My react app</a>
        </div>
        <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
            <ul className="nav navbar-nav">
                <li><Link to="/login">Login</Link></li>
                <li><Link to="/home">Home</Link></li>
                <li><Link to="/recipes">Recipes</Link></li>
                <li><Link to="/profil">Profil</Link></li>
            </ul> 
            <hr/>
                
        </div>
            <Switch>
                <Route path="/login" component={Login} />
                <Route exact path="/home" component={Home} />
                <PrivateRoute path="/recipes" component={Recipe} />
                <Route path="/profil" component={Profil} />
            </Switch> 
         </div>
    </nav>     
    </Router>    
)      
    



export default App