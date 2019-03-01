import React from 'react'

export default class Demo extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            num: 1
        } 
    }

    handleClick = () => {
        this.setState({
            num: this.state.num+1
        })
    }

    shouldComponentUpdate(nextProps, nextState){
        console.log(nextProps, nextState);
        if ( this.state.num % 5 === 0 ) {
            return true
        }
        console.log(this.state);
        return false;
    }

    render(){
        return (
            <div>
                <span>{ this.state.num }</span>
                <button onClick={this.handleClick}>click</button>
            </div>
        )
    }
}