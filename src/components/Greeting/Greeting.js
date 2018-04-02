import React from 'react'
import PropTypes from 'prop-types'

export class Greeting extends React.Component {
    render() {
        return <h1>Hi there, {this.props.name}</h1>
    }

   
}
Greeting.propTypes = {
    name: PropTypes.string.isRequired
}

Greeting.defaultProps = { name: 'Helene'}