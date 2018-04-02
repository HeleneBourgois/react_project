import React, { Component } from 'react'
import {Greeting} from './../Greeting/Greeting'
import {Button} from './../Button/Button'
//Stateless functionnal component because render static content to webpage


const Home = function() {
    return (
        <div>
            <div className='jumbotron'>
                <h1 className='main-title'> Home Page</h1>
            </div>
           
            <Greeting name='welcome'/>
           
        </div> 
         
    )
  
}

export default Home