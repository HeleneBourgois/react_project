import React, { Component } from 'react'
import axios from 'axios'
import { Route, Link, Redirect } from 'react-router-dom'


class Recipe extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            recipes: []
        }
    }

    componentDidMount() {
        let was = this
        axios.get('http://localhost:3000/recipes')
        .then(function(response) {
            console.log(response)
            was.setState({ recipes: response.data})

        })
        .catch( function(error) {
            console.log('error' + error)
        })
        event.preventDefault()
    } 
 
    render() {

        const { recipes } = this.state
        //ici jextraie recipes de state, et lui donne la nouvelle valeur contenue dans response attention cest du ES6

        return (
           
            <div>
                {recipes.map(recipe =>
                    <div key={recipe._id}>
                        <ul><li>{recipe.name}</li></ul>   
                    </div>
                )}
            </div>        
            
        )
    }
}

export default Recipe