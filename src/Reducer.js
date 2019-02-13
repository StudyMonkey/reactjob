import { combineReducers } from 'redux'
import {user} from './redux/user.redux'
import { chatUser } from './redux/chatuser_redux'

export default combineReducers({user, chatUser});