import { createStore } from 'redux';
import formReducer from './buttonReducer';


const store = createStore(formReducer);

export default store;