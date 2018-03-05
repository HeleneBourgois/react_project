import React, { Component } from 'react'
import axios from 'axios'
import { Route, Link, Redirect } from 'react-router-dom'
import {fakeAuth } from './../../App'
import Cookies from 'universal-cookie';
import { Form, Button } from 'semantic-ui-react'



class Login extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      username: '',
      password: ''
    }

    const { history } = this.props
  
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  } 
  
  handleChange(event){
    this.setState({[event.target.name]: event.target.value})

  }

  handleSubmit(event) {
    event.preventDefault()

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
          const cookies = new Cookies()
          cookies.set('userid', response.data.id, { 
            path: '/',
            expires: new Date('2018-11-11')
          })
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
    }

  render() {

    return (
      <form className='ui form' onSubmit={this.handleSubmit} id='form'> 
        <div className='field'>
          <input type='text' name='username' placeholder='username' onChange={this.handleChange} />
          <div className='ui pointing label'>Please enter a value</div>
        </div> 
        <div className='ui divider'>
        </div> 
        <div className='field'>
          <div className='ui pointing below label'>Please enter a value</div>
          <input type='password' name='password' placeholder='password' onChange={this.handleChange} />
        </div>
        <input type='submit' className='ui button'  value='Submit' />
      </form>
      
    )
  }
}

export default Login

