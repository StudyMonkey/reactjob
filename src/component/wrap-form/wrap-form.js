import React from 'react';

export default function wrapForm(Comp) {
    return class WrapperComp extends React.Component{
        constructor(props){
            super(props);
            this.state = {};
        }

        handleChange = (key, val) => {
            this.setState({
              [key]: val
            })
        }

        render(){
            return <Comp handleChange={this.handleChange} state={this.state} {...this.props}/>
        }
    }
}