import React, { Component } from 'react'
import axios from 'axios'
import { Route, Link, Redirect } from 'react-router-dom'


class Recipe extends React.Component {

    displayRecipes(event) {
        axios.get('http://localhost:3000/recipes')
        .then(function(response) {
            console.log(response)

        })
        .catch( function(error) {
            console.log('error' + error)
        })
        event.preventDefault()
      } 
    
    render(){

        return (
            <form onSubmit={this.displayRecipes}>
                <div className='jumbotron'>
                    <h1 className='display-3'>Recipes page</h1>
                </div>
                <input type='submit' value ='Get recipes'/>
            </form>
        )
    }
}

export default Recipe