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
            foods: [],
            options: [
              {
                key: null,
                value: null,
                text: null
              }
            ]


        }
        // const { history } = this.props
        
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
      }
      
      handleChange(event, data){
        //data = valeur qui a dedans , we use data because it is not an input
        //for input data doesnt work
        // console.log(data)
        this.setState({[event.target.name]: event.target.value})
        if (data && data.name === '_foods') {
          this.setState({_foods: data.value}) 
          // console.log(data.value)
        }
      }

      componentDidMount() {
        let was = this
        let cookies = new Cookies()
        let userid = cookies.get('userid')
        axios.get('http://localhost:3000/food/' , {
          //quand je mets params dans axios ca correspond a un query
          params: {
            _user: userid
          }

        }
      )
      .then((response) => {
        console.log(response)
        this.setState({foods: response.data})
        let options = response.data.map(food => {
          return {
            key: food._id,
            value: food._id,
            text: food.name
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
      const { options } = this.state
 
        return (
        <form className='ui form' onSubmit={this.handleSubmit} id='form' > 
        <div className='jumbotron'>
        <h1 className='display-3'>  New recipe</h1>
        </div>
        <h2 className='display-2'> Create a new recipe</h2>
        <div className='six wide field'>
          <input type='text' name='name' placeholder='Name' onChange={this.handleChange} />
        </div> 
        <div className='six wide field'>
          <Dropdown name='_foods' placeholder='Food' fluid multiple selection options={options} selection onChange={this.handleChange} />
        </div>
        <input type='submit' className='ui button' value='Submit' id='submit'/>
      </form>
        )
    }
}



export default NewRecipe
