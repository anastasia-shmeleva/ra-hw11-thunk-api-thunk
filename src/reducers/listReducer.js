import { 
  REMOVE_SERVICE, 
  PUT_SERVICES, 
  SET_STATUS, 
} from '../actions/actionTypes';

const initialState = {
  items: [],
  url: 'http://localhost:7070/api/services',
  status: '',
}

export default function listReducer(state = initialState, action) {
  switch (action.type) {
    case REMOVE_SERVICE:
      const { id } = action.payload;
      return state.items.filter(service => service.id !== id);
    case PUT_SERVICES:
      return { ...state, items: action.payload };
    case SET_STATUS:
      return { ...state, status: action.payload };
    default:
      return state;
  }
}
