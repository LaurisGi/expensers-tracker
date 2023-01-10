import React, { useState } from 'react'

export const Login = ( {onSuccess} ) => {
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = (e) => {
        e.preventDefault();
        fetch(`${process.env.REACT_APP_API_URL}/login`, {
            method : 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name,
                password
            })
        })
        .then((res) => res.json())
        .then((data) => {
            console.log(process.env.REACT_APP_API_URL)
              onSuccess(data) })
    }

  return (
    <form onSubmit={handleLogin}>
    <input
        type="text"
        placeholder='Name'
        onChange={(e) => setName(e.target.value)}
        value={name} 
    />
    <input
        type="text"
        placeholder='Password'
        onChange={(e)=> setPassword(e.target.value)}
        value={password} 
    />
    <button>Login</button>
    </form>
  );
}
