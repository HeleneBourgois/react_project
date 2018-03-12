import React, { Component } from 'react'
import axios from 'axios'
import { Route, Link, Redirect } from 'react-router-dom'



class FoodDetail extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            food: [],
            recipeId: this.props.match.params.recipeId
        }
        console.log(this.props.match.params)
    }

    componentDidMount() {
        let was = this
        axios.get('http://localhost:3000/food',{
         params:{
            _recipe: was.state.recipeId

            } 
        }
        )
        .then(function(response) {
            // console.log(response)
            was.setState({ food: response.data})
        })
        .catch( function(error) {
            console.log('error' + error)
        })
    }
    render() {
        const { food } = this.state
        
    return (
       <div>
            {food.map(food =>
                <div key={food._id}>
                    <ul><li>{food.quantity} {food.name}</li></ul>   
                </div>
            )}
        </div>          
            
        )
    }
}

export default FoodDetail