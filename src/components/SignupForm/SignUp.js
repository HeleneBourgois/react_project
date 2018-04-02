import React, { Component } from 'react'
import axios from 'axios'
import { Route, Link, Redirect } from 'react-router-dom'
import { Button, Form } from 'semantic-ui-react'



class Signup extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            firstName: '',
            lastName: '',
            username: '',
            password: '',
            dateOfBirth: '',
            age: ''

        }
        const { history } = this.props

        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
      } 
      
      handleChange(event){
        this.setState({[event.target.name]: event.target.value})
    
      }
    
      handleSubmit(event) {
          let firstName = this.state.firstName
          let lastName = this.state.lastName
          let username = this.state.username
          let password = this.state.password
          let dateOfBirth = this.state.dateOfBirth
          let age = this.state.age
          let was = this
          alert('A user was submitted: ' )
          axios.post('http://localhost:3000/user', { 
              firstName: firstName,
              lastName: lastName,
              username: username,
              password: password,
              dateOfBirth: dateOfBirth,
              age: age
            
          } )
      
          .then(function(response) {
            console.log(response)
            
          })
          .catch( function(error) {
            console.log('error' + error)
          }) 
        
          event.preventDefault()
        }
    render() {
        return (
        <form className='ui form' onSubmit={this.handleSubmit}> 
        <div className='jumbotron'>
        <h1 className='display-3'> Sign Up</h1>
        </div>
        <h2 className='display-2'>Please sign-up</h2>
        <div className='six wide field'>
          <input type='text' name='firstName' placeholder='firstName' onChange={this.handleChange} />
        </div>  
        <div className='six wide field'>
          <input type='text' name='lastName' placeholder='lastName' onChange={this.handleChange} />
        </div> 
        <div className='six wide field'>
          <input type='text' name='username' placeholder='username' onChange={this.handleChange}/>
        </div> 
        <div className='six wide field'>
          <input type='password' name='password' placeholder='password' onChange={this.handleChange} />
        </div>
        <div className='six wide field'>
          <input type='date' name='dateOfBirth' placeholder='dateOfBirth' onChange={this.handleChange} />
        </div>
        <div className='six wide field'>
          <input type='number' name='age' placeholder='age' onChange={this.handleChange} />
        </div>
        <input type='submit' className='ui button' value='Submit'/>
      </form>
        )
    }
}

export default Signup