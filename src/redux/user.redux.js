import Axios from "axios";
import { getRedirectPath } from '../util'

const AUTH_SUCCESS = 'AUTH_SUCCESS';
const ERROR_MSG = 'ERROR_MSG';
const LOAD_DATA = 'LOAD_DATA';
const LOGOUT = 'LOGOUT';

const initState = {
    redirectTo: '',
    msg: '',
    user: '',
    type: ''
}

// reducer
export function user(state=initState, action) {
    switch (action.type) {
        case ERROR_MSG:
            return {...state, isAuth: false, msg: action.msg}
        case AUTH_SUCCESS: 
            return {...state, msg: '', redirectTo: getRedirectPath(action.payload), ...action.payload}
        case LOAD_DATA:
            return {...state, ...action.payload}
        case LOGOUT:
            return {...initState, redirectTo: '/login'}
        default:
            return state;
    }
}

function errorMsg(msg){
    return {type: ERROR_MSG, msg};
}

function authSuccess(obj){
    const {pwd, ...data} = obj;  // pwd不显示在页面上的redux里面
    return {type: AUTH_SUCCESS, payload: data}
}

export function loadData(userinfo){
    console.log(userinfo);
    // 获取用户信息
    return {type: LOAD_DATA, payload: userinfo}
}

export function login({user, pwd}){
    if ( !user || !pwd ) {
        return errorMsg('用户名或者密码不能为空')
    }

    return dispatch => {
        Axios.post('/user/login', {user, pwd}).then(res => {
            if ( res.status === 200 && res.data.code === 0 ) {
                dispatch(authSuccess(res.data.data))
            } else {
                dispatch(errorMsg(res.data.msg))
            }
        }).catch( err => {
            console.log(err)
        })
    }
}

export function register({user, pwd, repeatPwd, type}){
    if (!user || !pwd || !type) {
        return errorMsg('用户名密码必须输入')
    }

    if (pwd !== repeatPwd) {
        return errorMsg('两次密码不一致')
    }

    return dispatch => {
        Axios.post('/user/register', {user, pwd, type}).then(res => {
            if ( res.status === 200 && res.data.code === 0 ) {
                dispatch(authSuccess({user, pwd, type}))
            } else {
                dispatch(errorMsg(res.data.msg))
            }
        }).catch( err => {
            console.log(err)
        })
    }
}

export function update(data) {
    return dispatch => {
        Axios.post('/user/update', data)
        .then( res => {
            if ( res.status === 200 && res.data.code === 0 ) {
                dispatch(authSuccess(res.data.data))
            } else {
                dispatch(errorMsg(res.data.msg))
            }
        }).catch( err => {
            console.log(err)
        })
    }
}

export function logoutSubmit(){
    return {type: LOGOUT};
}

