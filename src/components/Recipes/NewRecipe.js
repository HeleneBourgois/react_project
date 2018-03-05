import React, { Component } from 'react'
import axios from 'axios'
import { Route, Link, Redirect } from 'react-router-dom'
import Cookies from 'universal-cookie'
import { Button, Form } from 'semantic-ui-react'


class NewRecipe extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            name: '',
            _foods: [],
            recipes: [],


        }
        const { history } = this.props

        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
      } 
      
      handleChange(event){
        console.log(event.target)
        this.setState({[event.target.name]: event.target.value})

      }

      componentDidMount() {
        let was = this
        let cookies = new Cookies()
        let userid = cookies.get('userid')
        axios.get('http://localhost:3000/food/' , {
          //userid dans paramas car query va dans url
          //quand je mets params dans axios ca correspond a un query
          params: {
            _user: userid
          }

        }
      )
      .then((response) => {
        this.setState({recipes: response.data})

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
            //+ userid car params soit egal a :USERID
              name: name,
              _foods: [_foods]
            
          } )
      
          .then(function(response) {
            
          })
          .catch(function(error) {
          }) 
        
         
        }
    render() {
      const { recipes } = this.state
 
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
        <select name='_foods' value={this.state.value} onChange={this.handleChange}>
          {recipes.map(recipe => <option key={recipe._id} value= {recipe._id}>{recipe.name } </option>)}
        </select>
        </div>
        <input type='submit' className='ui button' value='Submit' id='submit'/>
      </form>
        )
    }
}

export default NewRecipe