import React, { Component } from 'react'
import axios from 'axios'
import { Route, Link, Redirect } from 'react-router-dom'
import Cookies from 'universal-cookie'
import { Button, Form, Dropdown } from 'semantic-ui-react'



class NewRecipe extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            name: '',
            _foods: [],
            recipes: [],
            options: [
              {
                key: null,
                value: null,
                text: null
              }
            ]


        }
        const { history } = this.props
        
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
      }
      
      handleChange(event, data){
        console.log(data)
        this.setState({[event.target.name]: event.target.value})
        if (data && data.name === '_foods') {
          this.setState({_foods: data.value}) 
          console.log(data.value)
        }
      }

      componentDidMount() {
        let was = this
        let cookies = new Cookies()
        let userid = cookies.get('userid')
        axios.get('http://localhost:3000/food/' , {
          params: {
            _user: userid
          }

        }
      )
      .then((response) => {
        console.log(response)
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
      })
      }

      
    
      handleSubmit(event) {
        event.preventDefault()
          let name = this.state.name
          let _foods = this.state._foods
          console.log(_foods)
          console.log(name)
          let was = this
          let cookies = new Cookies()
          let userid = cookies.get('userid')
          alert('A recipe was submitted: ' )
          axios.post('http://localhost:3000/recipe/' + userid, { 
              name: name,
              _foods: _foods
            
          } )
      
          .then(function(response) {
            
          })
          .catch(function(error) {
          }) 
        
         
        }
        
        
        
        
    render() {
      const { recipes, options } = this.state
 
        return (
        <form className='ui form' onSubmit={this.handleSubmit} id='form' > 
        <div className='jumbotron'>
        <h1 className='display-3' id='title'>  New recipe</h1>
        </div>
        <h2 className='display-2'> Create a new recipe</h2>
        <div>
          <input type='text' name='name' placeholder='name' onChange={this.handleChange} />
        </div> 
        <div>
          <Dropdown name='_foods' placeholder='Skills' fluid multiple selection options={options} selection onChange={this.handleChange} />
        </div>
        <input type='submit' className='ui button' value='Submit' id='submit'/>
      </form>
        )
    }
}



export default NewRecipe