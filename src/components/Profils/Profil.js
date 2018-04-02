import React, { Component } from 'react'
import axios from 'axios'
import { Route, Link, Redirect } from 'react-router-dom'
import Cookies from 'universal-cookie'
import { List, Dropdown, Menu } from 'semantic-ui-react'
import {Button} from './../Button/Button'


class Profil extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            userId: '',
            recipes: [],
            recipeId: false,
            options: [
                {
                    key: 1, text: 'By name asc', value: 1
                },
                {
                    key: 2, text: 'By name desc', value: 2
                },
                {
                    key: 3, text: 'By date', value: 3
                }
            ]
        }
        this.handleChange = this.handleChange.bind(this)
    }
    handleChange(event, data) {
        let userid = this.state.userId
        console.log("dataaa", data)
        this.setState({[event.target.name]: event.target.value})
        if (data && data.name === 'sort') {
            this.setState({sort: data.value}) 
            if ( data.value === 1) {
                axios.get('http://localhost:3000/recipes', {
                    params: {
                        filter: {
                        _user: userid
                    },
                    sort: {
                        name: 'asc'
                    }
                 }
                })
                .then(function(response) {
                    // console.log(response)
                    was.setState({ recipes: response.data})
        
                })
                .catch( function(error) {
                    console.log('error' + error)
                })
            } 
            else if (data.value === 2) {
                axios.get('http://localhost:3000/recipes', {
                    params: {
                        filter: {
                        _user: userid
                    },
                    sort: {
                        name: 'desc'
                    }
                 }
                })
                .then(function(response) {
                    // console.log(response)
                    was.setState({ recipes: response.data})
        
                })
                .catch( function(error) {
                    console.log('error' + error)
                })
            }
            else if (data.value === 3) {
                axios.get('http://localhost:3000/recipes', {
                    params: {
                        filter: {
                        _user: userid
                    },
                    sort: {
                        _createdAt: 'asc'
                    }
                 }
                })
                .then(function(response) {
                    // console.log(response)
                    was.setState({ recipes: response.data})
        
                })
                .catch( function(error) {
                    console.log('error' + error)
                })
            }
        }
    }

    componentDidMount() {
        let cookies = new Cookies()
        let userid = cookies.get('userid')
        this.setState({userId: userid})
         console.log('userid' + userid)
        let was = this
        axios.get('http://localhost:3000/recipes', {
            params: {
                filter: {
                _user: userid
            },
            sort: {
                // name: 'desc'
            }
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

    handleClick() {
        let number = ''
        let i = 0
        for (i = 0; i < 15; i++) {
            number += 1
        }
        alert(number)
    }
    
    
    render() {
        const { options } = this.state
        const { recipes } = this.state
        const { recipeId } = this.state
        if (recipeId) {
            console.log(recipeId)
            let url = '/foodDetail/' + recipeId
            return <Redirect to={ url } push={ true } />
        }
        return (
            <div>
                <div className='jumbotron'>
                    <h1 className='mainTitle'>Profil Page</h1>
                </div>  
                <h2 className='display-2'>Sort by field</h2>
                <div className='six wide field'>
                    <Dropdown name='sort' placeholder='Sort' search selection options={options} onChange={this.handleChange} />
                </div>

                
                <div role='list' className='ui link list'>
                <a style={{cursor: 'pointer'}}>
                    {recipes.map(recipe =>
                        <div role='listitem' onClick={() => this.setState({ recipeId: recipe._id })} key={recipe._id}>
                            <ul><li role='listitem' className='item'>{recipe.name}</li></ul>  
                        </div>
                    )}
                </a>  
                </div>  
                <Button onClick={this.handleClick} />   
            </div>
        )
    }
   
}




export default Profil