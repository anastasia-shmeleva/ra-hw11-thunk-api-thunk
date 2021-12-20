import { CHANGE_FIELD, CLEAR_FORM } from '../actions/actionTypes';

const initialState = {
  name: '',
  price: '',
  content: '',
};

export default function formReducer(state = initialState, action) {
  switch (action.type) {
    case CHANGE_FIELD:
      const { name, value } = action.payload;
      return { ...state, [name]: value };
    case CLEAR_FORM:
      return state = {
        name: '',
        price: '',
        content: '',
      }
    default:
      return state;
  }
}