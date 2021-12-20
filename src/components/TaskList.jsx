import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeService, fetchItems } from '../actions/actionCreators';
import { Facebook } from 'react-spinners-css';
import { useNavigate } from 'react-router-dom';

export default function TaskList() {
  const dispatch = useDispatch();
  let navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchItems());
  }, []);

  const { items, status } = useSelector((rootReducer) => rootReducer.list);
  
  const handleEdit = (id) => {
    navigate(`${id}`);
  }

  const handleRemove = (id) => {
    dispatch(removeService(id));
  }

  if (status === 'pending') return <div style={{textAlign: 'center'}}><Facebook color={'black'}/></div>

  if (status === 'error') return <div style={{textAlign: 'center', margin: 20, fontSize: 20}}>Something went wrong...</div>

  return (
    <ul className='list'>
      {items && 
        items.map(item => (
          <li key={item.id} style={{marginTop: 10}}>
            <div style={{display: 'inline-block', width: 200}}>
              {item.name}
            </div>
            <div style={{display: 'inline-block', width: 100}}>
              {item.price}
            </div>
            <button onClick={() => handleEdit(item.id)}>✎</button>
            <button onClick={() => handleRemove(item.id)}>X</button>
          </li>
        ))}
    </ul>
  )
}
