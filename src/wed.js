import React from 'react'
import ReactDOM from 'react-dom'

class Wed extends React.Component {
    constructor() {
        super()
        this.state = {val: 0}
        this.update = this.update.bind(this)
    }
    update() {
        this.setState({val: this.state.val + 1 })
    }
    componentWillMount() {
        console.log('componentWillMount')
        this.setState({m: 2})
    }
  
   render(){
       console.log('render')
       return <button onClick={this.update}>{this.state.val * this.state.m}</button>
   }
   componentDidMount() {    
    console.log('componentDidMount')
   this.inc = setInterval(this.update,500)
    }
    componentWillUnmount() {
        console.log('componentWillUnmount')
        clearInterval(this.inc)
    }
}
class Wrapper extends React.Component {
    mount() {
        ReactDOM.render(<Wed />, document.getElementById('a'))

    }
    unmount() {
        ReactDOM.unmountComponentAtNode(document.getElementById('a'))
    }
        render() {
            return (
                <div>
                    <button onClick={this.mount.bind(this)}>Mount</button>
                    <button onClick={this.unmount.bind(this)}>Unmount</button>
                    <div id="a"></div>
                </div>
            )
        }
    }

class Update extends React.Component {
    constructor() {
        super()
        this.state = {increasing: false}
    }
    update() {
        ReactDOM.render(
            <Update val={this.props.val+1} />,
            document.getElementById('root')
        )
    }
    componentWillReceiveProps(nextProps) {
        this.setState({increasing: nextProps.val > this.props.val})
    }
    shouldComponentUpdate(nextProps, nextState) {
        return nextProps.val % 5 === 0
    }
    componentDidUpdate(prevProps, prevState) {
        console.log('prevProps: ${prevProps.val}')
    }
    render() {
        console.log(this.state.increasing)
        return (
            <button onClick={this.update.bind(this)}>
            {this.props.val}
            </button>
        )
    }
}

Update.defaultProps = {val: 0}

class Data extends React.Component {
    constructor(){
        super()
        this.state = {items: []}
    }
    componentWillMount(){
        fetch( 'http://swapi.co/api/people/?format=json')
        .then(response => response.json() )
        .then( ({results: items}) => this.setState({items}))
    }
    render(){
        let items = this.state.items
        return (
            <div>
                {items.map(item => <h4>{item.name}</h4>)}
            </div>
        )
        
    }
}
 
const HOC = (InnerComponent) => class extends React.Component {
    constructor(){
        super()
        this.state = {count: 0}
    }
    update(){
        this.setState({count: this.state.count + 1})
    }
    componentWillMount(){
        console.log('will mount')
    }
    render() {
        return (
            <InnerComponent
            {...this.props}
            {...this.state}
            update={this.update.bind(this)}
             />
        )
    }
}

class Fun extends React.Component {
    render(){
        return (
            <div>
                <Button>button</Button>
                <hr/>
                <LabelHOC>label</LabelHOC>
            </div>
        )
    }
}

const Button = HOC((props) =>
 <button onClick={props.update}>{props.children} - {props.count}</button>)

class Label extends React.Component {
    componentWillMount(){
        console.log('label will mount')
    }
    render(){
        return(
            <label onMouseMove={this.props.update}>{this.props.children} - {this.props.count}</label>
        )
    }
}
const LabelHOC = HOC(Label)

class Children extends React.Component {
    render(){
        return (
            <Parent>
                <div className='childA'></div>
                <div className='childB'></div>
                <div className='childC'></div>
             </Parent>   
        )
    }
}
class Parent extends React.Component {
    render(){
        console.log(this.props.children)
        // let items = React.Children
        // .map(this.props.children, child => child)
        let items = React.Children
            .forEach(this.props.children, child => console.log(child.props.className))
        // let items = React.Children.only(this.props.children)
        console.log(items)
        return null
    }
}

class Select extends React.Component {
    render(){
        return (
            <Buttons>
                <button value='A'>A</button>
                <button value='B'>B</button>
                <button value='C'>C</button>
            </Buttons>
        )
    }
}
class Buttons extends React.Component {
    constructor(){
        super()
        this.state = {selected: 'None'}
    }
    selectItem(selected){
        this.setState({selected})
    }
    render(){
        let fn = child =>
        React.cloneElement(child, {
            onClick: this.selectItem.bind(this, child.props.value)
        })
            React.cloneElement(0)
        let items = React.Children.map(this.props.children, fn)
        return (
            <div>
            <h2>You have Selected: {this.state.selected}</h2>
            {items}
            </div>
        )
    }
}

// // export default Wed
// export default Wrapper
// export default Update
// export default Data
// export default Fun
// export default Children
// export default Select