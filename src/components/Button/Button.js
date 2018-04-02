import React from 'react'

export class Button extends React.Component {
    render(){
        return (
            <div>
                <button onClick={this.props.onClick}>
                    Click me!
                </button>
                <hr/>
            </div>
        )
    }
}