import { createStore, combineReducers, applyMiddleware } from 'redux';
import listReducer from '../reducers/listReducer';
import formReducer from '../reducers/formReducer';
import thunk from 'redux-thunk'; 

const reducer = combineReducers({
  list: listReducer,
  form: formReducer
});

const store = createStore(
  reducer,
  applyMiddleware(thunk),
);

export default store;