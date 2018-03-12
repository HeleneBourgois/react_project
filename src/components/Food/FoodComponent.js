import React, { Component } from 'react'
import axios from 'axios'
import { Route, Link, Redirect } from 'react-router-dom'
import Cookies from 'universal-cookie'
import { Button, Form, Dropdown } from 'semantic-ui-react'

class Food extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            color: '',
            name: '',
            quantity: '',
            _recipe: [],
            recipes: [],
            options: [
              {
                key: null,
                value: null,
                text: null
              }
            ]

        }

        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
      } 
      
      handleChange(event, data){
        this.setState({[event.target.name]: event.target.value})
        if (data && data.name === '_recipe') {
          console.log('datafull', data)
          this.setState({_recipe: data.value})
          console.log('data', data.value)
        }
    
      }

      componentDidMount() {
        let was = this
        let cookies = new Cookies()
        let userid = cookies.get('userid')
        axios.get('http://localhost:3000/recipes/', {
          params: {
            _user: userid
          }
        })
        .then((response) => {
          this.setState({recipes: response.data})
          let options = response.data.map(recipe => {
            return {
              key: recipe._id,
              value: recipe._id,
              text: recipe.name
            }
          })
          this.setState({options: options})

        })
        .catch(function(error) {
          console.log(error)
        })
      }
    
      handleSubmit(event) {
        event.preventDefault()
          let color = this.state.color
          let name = this.state.name
          let quantity = this.state.quantity
          let _recipe = this.state._recipe
          let was = this
          let cookies = new Cookies()
          let userid = cookies.get('userid')
          console.log("ICIII", userid)
          alert('A food was submitted: ' )
          axios.post('http://localhost:3000/food/' + userid, { 
              color: color,
              name: name,
              quantity: quantity,
              _recipe: _recipe
            
          } )
      
          .then(function(response) {
            console.log(response)
            
          })
          .catch( function(error) {
            console.log('error' + error)
          }) 
        
         
        }
    render() {
      const { options } = this.state
        return (
        <form className='ui form' onSubmit={this.handleSubmit} id='form'> 
        <div className='jumbotron'>
        <h1 className='display-3'>  New food</h1>
        </div>
        <h2 className='display-2'> Create new food</h2>
        <div className='six wide field'>
          <input type='text' name='color' placeholder='color' onChange={this.handleChange} />
        </div>  
        <div className='six wide field'>
          <input type='text' name='name' placeholder='name' onChange={this.handleChange} />
        </div> 
        <div className='six wide field'>
          <input type='number' name='quantity' placeholder='quantity' onChange={this.handleChange}/>
        </div> 
        <div className='six wide field'>
          <Dropdown name='_recipe' placeholder='Recipes' fluid multiple selection options={options} selection onChange={this.handleChange} />
        </div>
        <input type='submit' className='ui button' value='Submit' id='submit'/>
      </form>
        )
    }
}

export default Food