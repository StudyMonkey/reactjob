import React from 'react';
import ReactDom from 'react-dom';
import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk';
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import './index.css'



import reducers from './Reducer'
import './config'

const store = createStore(reducers, compose(
    applyMiddleware(thunk),
    window.devToolsExtension ? window.devToolsExtension() : f=>f
));

// 路由守卫: 定义可以验证的高阶组件
/* function privateRoute({component: Component, ...rest}){
    return (<Route {...rest} render={props => 
        this.props.user ? 
        ( <Component {...props} /> ) : 
        <Redirect to={{pathname: '/login', state: {from: props.localtion.pathname}}}  /> }

    )
} */

// boss genius me msg 四个页面
ReactDom.render(
    (<Provider store={store}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>),
    document.getElementById('root')
)





