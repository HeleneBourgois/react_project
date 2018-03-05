import React, { Component } from 'react'
import axios from 'axios'
import { Route, Link, Redirect } from 'react-router-dom'
import Cookies from 'universal-cookie'


class Food extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            color: '',
            name: '',
            quantity: ''

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
          let color = this.state.color
          let name = this.state.name
          let quantity = this.state.quantity
          let was = this
          let cookies = new Cookies()
          let userid = cookies.get('userid')
          console.log("ICIII", userid)
          alert('A food was submitted: ' )
          axios.post('http://localhost:3000/food/' + userid, { 
              color: color,
              name: name,
              quantity: quantity
            
          } )
      
          .then(function(response) {
            console.log(response)
            
          })
          .catch( function(error) {
            console.log('error' + error)
          }) 
        
         
        }
    render() {
        return (
        <form onSubmit={this.handleSubmit} id='form'> 
        <div className='jumbotron'>
        <h1 className='display-3' id='title'>  New food</h1>
        </div>
        <h2 className='display-2'> Create new food</h2>
        <div>
          <input type='text' name='color' placeholder='color' onChange={this.handleChange} />
        </div>  
        <div>
          <input type='text' name='name' placeholder='name' onChange={this.handleChange} />
        </div> 
        <div>
          <input type='number' name='quantity' placeholder='quantity' onChange={this.handleChange}/>
        </div> 
        <input type='submit' value='Submit' id='submit'/>
      </form>
        )
    }
}

export default Food