import { createStore, combineReducers } from 'redux'
import cartReducer from '../reducers/itemReducer'

const rootReducers = combineReducers({
    items: cartReducer
})

const configureStore = () => createStore(rootReducers);
export default configureStore