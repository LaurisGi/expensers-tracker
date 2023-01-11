import './App.css';
import { Expenses } from './pages/Expenses/Expenses';
import { Routes, Route, useNavigate } from 'react-router-dom'
import { PageLayout } from './Components/PageLayout/PageLayout';
import { Login } from './pages/Expenses/Login/Login';
import { useState } from 'react';
import { Register } from './pages/Expenses/Register/Register';

function App() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);


  const handleLoginSuccess = (user) => {
    setUser(user);
    navigate('/');
  }

  return (
    <div>
      <Routes>
        <Route path="/" element={<PageLayout user={user} />}>
          <Route index element={<Expenses />} />
        </Route>
        <Route path='/login' element={<Login onSuccess={handleLoginSuccess} />}/>
        <Route path='/register' element={<Register />} />
      </Routes>
    </div>
  );
}

export default App;