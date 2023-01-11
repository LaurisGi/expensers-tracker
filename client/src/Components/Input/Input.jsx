import React from 'react'
import styled from 'styled-components';

const InputStyled = styled.input`
padding: 10px;
margin-bottom: 10px;
font-size: 18px;
border-radius: 5px;
border: none;
box-shadow: 0px 0px 2px 1px #ccc;
&:focus {
  outline: none;
  box-shadow: 0 0 0 2px #4da6ff;
}
`;

export const Input = ({...props}) => {
  return (
    <InputStyled {...props}/>
  )
}

