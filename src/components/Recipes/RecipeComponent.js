import React, { Component } from 'react'
import axios from 'axios'
import { Route, Link, Redirect } from 'react-router-dom'
import Cookies from 'universal-cookie'
import { List } from 'semantic-ui-react'



class Recipe extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            recipes: [],
            recipeId: false
        }
    }


    componentDidMount() {
        let cookies = new Cookies()
        let userid = cookies.get('userid')
         console.log('userid' + userid)
        let was = this
        axios.get('http://localhost:3000/recipes', {
            params: {
                _user: userid
            }
        })
        .then(function(response) {
            // console.log(response)
            was.setState({ recipes: response.data})

        })
        .catch( function(error) {
            console.log('error' + error)
        })
        event.preventDefault()
    } 
 
    render() {

        const { recipes } = this.state
        const { recipeId } = this.state
        if (recipeId) {
            console.log(recipeId)
            let url = '/foodDetail/' + recipeId
            return <Redirect to={ url } push={ true } />
        }
        return (
            <div role='list' className='ui link list'>
            <a style={{cursor: 'pointer'}}>
                {recipes.map(recipe =>
                    <div role='listitem' onClick={() => this.setState({ recipeId: recipe._id })} key={recipe._id}>
                        <ul><li role='listitem' className='item'>{recipe.name}</li></ul>  
                    </div>
                )}
            </a>  
            </div>        
            
        )
    }
}

export default Recipe