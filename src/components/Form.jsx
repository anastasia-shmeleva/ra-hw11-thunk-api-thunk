import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { changeServiceField, clearForm, getItem, changeItem } from '../actions/actionCreators';
import { Facebook } from 'react-spinners-css';

export default function Form() {
  const dispatch = useDispatch();
  const { id } = useParams();
  let navigate = useNavigate();

  useEffect(() => {
    dispatch(getItem(id));
  }, []);

  const { name, price, content } = useSelector((rootReducer) => rootReducer.form);
  const { status } = useSelector((rootReducer) => rootReducer.list);

  const handleChange = (event) => {
    const { name, value } = event.target;
    dispatch(changeServiceField(name, value));
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const itemToChange = {id, name, price, content};
    dispatch(changeItem(itemToChange));
    dispatch(clearForm());
    if (status === 'success') navigate('/');
  }

  const handleCancel = (e) => {
    e.preventDefault();
    dispatch(clearForm());
    navigate('/');
  }

  if (status === 'pending') return <div style={{textAlign: 'center'}}><Facebook color={'black'}/></div>

  if (status === 'error') return <div style={{textAlign: 'center', margin: 20, fontSize: 20}}>Something went wrong...</div>

  return (
    <form style={{display: 'flex', flexDirection: 'column'}} onSubmit={handleSubmit}>
      <label htmlFor="name" style={{paddingTop: 10, paddingBottom: 10}}>Name</label>
      <input 
        name='name'
        value={name}
        onChange={handleChange}
        style={{width: 200}}
      />
      <label htmlFor="price" style={{paddingTop: 10, paddingBottom: 10}}>Price</label>
      <input 
        name='price'
        value={price}
        onChange={handleChange}
        style={{width: 200}}
      />
      <label htmlFor="Content" style={{paddingTop: 10, paddingBottom: 10}}>Content</label>
      <input 
        name='content'
        value={content}
        onChange={handleChange}
        style={{width: 200}}
      />
      <button style={{width: 70, marginTop: 10}} onClick={handleSubmit} type='primary'>Save</button>
      <button style={{width: 70, marginTop: 10}} onClick={handleCancel} type='primary'>Cancel</button>
    </form>
  )
}
