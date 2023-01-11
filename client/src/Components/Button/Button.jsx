import React from 'react'
import styled from 'styled-components'

const ButtonStyled = styled.button`
  background-color: #4da6ff;
  color: #fff;
  font-size: 18px;
  padding: 10px 20px;
  border-radius: 5px;
  border: none;
  cursor: pointer;
  &:hover {
    background-color: #0077c9;
  }
`;

export const Button = ({...props}) => {
  return (
    <ButtonStyled {...props} />
  )
}
