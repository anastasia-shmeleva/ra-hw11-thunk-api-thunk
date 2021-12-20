import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom'

import Form from './components/Form';
import TaskList from './components/TaskList';

function App() {
  return (
    <Router>
      <div className="container" style={{margin: 50, width: 550}}>
        <Routes>
          <Route path="/services/:id" element={<Form/>} />
          <Route path="/services" element={<TaskList/>} />
          <Route path="/" element={<Navigate replace to="/services" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
