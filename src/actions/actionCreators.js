import {
  REMOVE_SERVICE,
  CHANGE_FIELD,
  PUT_SERVICES,
  SET_STATUS,
  CLEAR_FORM,
} from './actionTypes';

export function changeServiceField(name, value) {
  return { type: CHANGE_FIELD, payload: { name, value } };
}

export function clearForm() {
  return { type: CLEAR_FORM, payload: '' };
}

export function setStatus(text) {
  return { type: SET_STATUS, payload: text };
}

export const fetchItems = () => (dispatch, getState) => {
  dispatch(setStatus('pending'));
  const url = getState().list.url;
  try {
    fetch(url)
    .then(response => response.json())
    .then(json => {
      dispatch({ type: PUT_SERVICES, payload: json });
      dispatch(setStatus('success'));
    });
  } catch (error) {
    dispatch(setStatus('error'));
  }
}

export const getItem = (id) => (dispatch, getState) => {
  dispatch(setStatus('pending'));
  const url = getState().list.url;
  try {
    fetch(`${url}/${id}`)
    .then(response => response.json())
    .then(json => {
      dispatch(changeServiceField('name', json.name));
      dispatch(changeServiceField('price', json.price));
      dispatch(changeServiceField('content', json.content));
      dispatch(setStatus('success'));
    });
  } catch (error) {
    dispatch(setStatus('error'));
  }
}

export const removeService = (id) => (dispatch, getState) => {
  dispatch(setStatus('pending'));
  const url = getState().list.url;
  try {
    fetch(`${url}/${id}`, {
    method: 'DELETE',
    body: id
  });
  dispatch(fetchItems());
    // dispatch({ type: REMOVE_SERVICE, payload: { id } });
    // dispatch(setStatus('success'));
  } catch (error) {
    dispatch(setStatus('error'));
  }
}

export const changeItem = (item) => (dispatch, getState) => {
  dispatch(setStatus('pending'));
  const url = getState().list.url;

  const formData = new FormData();
  formData.append('id', item.id);
  formData.append('name', item.name);
  formData.append('price', item.price);
  formData.append('content', item.content);

  try {
    fetch(url, {
      method: 'POST',
      body: new URLSearchParams(formData)
    });
    dispatch(setStatus('success'));
  } catch (error) {
    dispatch(setStatus('error'));
  }
}