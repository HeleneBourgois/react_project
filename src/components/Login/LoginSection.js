import React, { Component } from 'react'
import axios from 'axios'
import { Route, Link, Redirect } from 'react-router-dom'
// import { createBrowserHistory } from 'history'
// import Alert from 'react-bootstrap-alert'
// import { ButtonInput } from 'react-bootstrap';
// import { Form, ValidatedInput } from 'react-bootstrap-validation';
import {fakeAuth } from './../../App'


class Login extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      username: '',
      password: ''
    }


    // state = {
    //   redirectToReferrer: false
    // // }
    // login = () => {
    //   fakeAuth.authenticate(() => {
    //     this.setState(() => ({
    //       redirectToReferrer: true
    //     }))
    //   })
    // }

    const { history } = this.props
    // this.setState({ error: false })

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  } 
  
  handleChange(event){
    this.setState({[event.target.name]: event.target.value})

  }

  handleSubmit(event) {
      let log = this.state.username + ' ' + this.state.password
      let username = this.state.username
      let password = this.state.password
      let was = this
      alert('A name was submitted: ' + log)
      axios.get('http://localhost:3000/login', { 
        params: { 
          username: username,
          password: password
        }
      } )
  
      .then(function(response) {
        console.log(response)
        if (!response.data) {
          return console.log("no data from back")
        }
        if (!response.data.authenticate && !response.data.password) {
          // return this.setState({ error: true })
          console.log('nono')
          was.props.history.push('/login')
        } 
        else if (response.data.authenticate && !response.data.password) {
          console.log('wrong pass')
          was.props.history.push('/login')
        } else {
          was.setState({ username: username , password: password})
          console.log('welcome back user')
          fakeAuth.authenticate(function() {
            was.setState({ redirectToReferrer: true });
            was.props.history.push('/recipes')
          })
        }
      })
      .catch( function(error) {
        console.log('error' + error)
      }) 
    
      event.preventDefault()
    }

  render() {
    // const { from } = this.props.location.state || { from: { pathname: '/' } }
    // const { redirectToReferrer } = this.state

    // if (redirectToReferrer === true) {
    //   <Redirect to={from} />
    // }

    return (
      <form onSubmit={this.handleSubmit}> 
        <div>
          <input type='text' name='username' placeholder='username' onChange={this.handleChange} />
        </div>  
        <div>
          <input type='password' name='password' placeholder='password' onChange={this.handleChange} />
        </div>
        <input type='submit' value='Submit'/>
      </form>
      
    )
  }
}

// const PrivateRoute = ({ component: Component, ...rest }) => (
//   <Route
//     {...rest}
//     render={props =>
//       fakeAuth.isAuthenticated ? (
//         <Component {...props} />
//       ) : (
//         <Redirect
//           to={{
//             pathname: "/login",
//             state: { from: props.location }
//           }}
//         />
//       )
//     }
//   />
// );

export default Login

