import Axios from "axios";
import { getRedirectPath } from '../util'

const REGIST_SUCCESS = 'REGIST_SUCCESS';
const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
const ERROR_MSG = 'ERROR_MSG';
const LOAD_DATA = 'LOAD_DATA';

const initState = {
    redirectTo: '',
    isAuth: false,
    msg: '',
    user: '',
    type: ''
}

// reducer
export function user(state=initState, action) {
    switch (action.type) {
        case ERROR_MSG:
            return {...state, isAuth: false, msg: action.msg}
        case REGIST_SUCCESS: 
            return {...state, msg: '', redirectTo: getRedirectPath(action.payload), isAuth: true, ...action.payload}
        case LOGIN_SUCCESS:
            return {...state, msg: '', redirectTo: getRedirectPath(action.payload), isAuth: true, ...action.payload}
        case LOAD_DATA:
            return {...state, ...action.payload}
        default:
            return state;
    }
}

function errorMsg(msg){
    return {type: ERROR_MSG, msg};
}

function registerSuccess(data){
    return {type: REGIST_SUCCESS, payload:data}
}

function loginSuccess(data){
    return {type: LOGIN_SUCCESS, payload:data}
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
                dispatch(loginSuccess(res.data.data))
            } else {
                dispatch(errorMsg(res.data.msg))
            }
        }).catch( err => {
            console.log(err)
        })
    }
}

export function register({user, pwd, repeatPwd, type}){
    console.log({user, pwd, type});
    if (!user || !pwd || !type) {
        return errorMsg('用户名密码必须输入')
    }

    if (pwd !== repeatPwd) {
        return errorMsg('两次密码不一致')
    }

    return dispatch => {
        Axios.post('/user/register', {user, pwd, type}).then(res => {
            if ( res.status === 200 && res.data.code === 0 ) {
                dispatch(registerSuccess({user, pwd, type}))
            } else {
                dispatch(errorMsg(res.data.msg))
            }
        }).catch( err => {
            console.log(err)
        })
    }
}

