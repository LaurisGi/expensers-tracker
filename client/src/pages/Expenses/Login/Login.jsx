import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { Button } from '../../../Components/Button/Button';
import { Input } from '../../../Components/Input/Input';
import styled  from 'styled-components'

const FieldsetStyled = styled.fieldset`
    border: 0;
    display: flex;
    flex-direction: column;
    gap: 5px;
    justify-content: center;
`;

const FormStyled = styled.form`
    background-color: #fff;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 15px;
`;

const LoginContainer = styled.div`
    align-items: center;
    background-color: lightgrey;
    display: flex;
    justify-content: center;
    height: 100vh;
`;

    const LinkStyled = styled(Link)`
    display: flex;
    align-self: center;
    flex-direction: column;
    gap: 5px;
    justify-content: center;
    border: 0;
    `;


export const Login = ( {onSuccess} ) => {
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState('');

    const handleLogin = (e) => {
        e.preventDefault();
        setIsLoading(true);
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
        .then((res) => {
            if (res.status === 200) {
                return res.json();
            }
            throw new Error('Test error');
    })
        .then((data) => {
              onSuccess(data);
              setIsLoading(true);
            })
            .catch((e)=> {
                setError(String(e));
                setIsLoading(false);
            })
    }

  return (
    <LoginContainer>
        <FormStyled onSubmit={handleLogin}>
        <h1>Expenses tracker</h1>
        <FieldsetStyled disabled={isLoading}>
            <Input
                type="text"
                placeholder='Name'
                onChange={(e) => setName(e.target.value)}
                value={name} 
                disabled={isLoading}
            />
            <Input
                type="text"
                placeholder='Password'
                onChange={(e)=> setPassword(e.target.value)}
                value={password} 
                disabled={isLoading}
            />
            <Button disabled={isLoading} >Login</Button>
            {error && <div>{error}</div>}
            <LinkStyled to="/register">Register</LinkStyled>
            </FieldsetStyled>
        </FormStyled>

    </LoginContainer>
  );
}
