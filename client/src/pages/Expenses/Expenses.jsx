import { useState } from "react";
import { useEffect } from "react"
import { LOGGED_IN_USER } from "../../constants/constants"
import styled from 'styled-components'

const ExpensesList = styled.ul`
    display: flex;
    flex-direction: column;
    gap: 8px;
    list-style: none;
`;

const ExpensesListItem = styled.li`
    border-radius: 10px;
    box-shadow: 0 5px 7px -1px rgb(51 51 51 / 23%);
    display: flex;
    justify-content: space-between;
    padding: 10px 30px;
    align-items: center;
`;

const ExpenseAmount = styled.span`
    color: #35d8ac;
    font-size: 34px;
    font-weight: 700;
`;

const ExpenseType = styled.span`
    color: #979cb0;
    font-size: 20px;
    font-weight: 600;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
`


const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
`;

const FormInput = styled.input`
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

const FormButton = styled.button`
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

export const Expenses = () => {
    const [expenses, setExpenses] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [type, setType] = useState('');
    const [amount, setAmount] = useState('');


    useEffect(() => {
        fetch(`${process.env.REACT_APP_API_URL}/expenses?userId=${LOGGED_IN_USER.id}`)
            .then(res => res.json())
            .then(data => {
                setExpenses(data);
                setIsLoading(false);
            });
    }, []);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    const handleExpenseAdd = (e) => {
        e.preventDefault();
        fetch(`${process.env.REACT_APP_API_URL}/expenses`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                type,
                amount,
                userId: 1
            })
        })
        .then((res)=> res.json())
        .then((data)=> {
            setExpenses(data);
            setType('');
            setAmount('');
        });
    }

    return (
        <ExpensesList>
            <form onSubmit={handleExpenseAdd}>
                <FormInput
                    placeholder="type"
                    required 
                    onChange={(e) => setType(e.target.value)}
                    value={type}
                /> 
                <FormInput 
                    placeholder="amount"
                    type="number"
                    required
                    onChange={(e) => setAmount(e.target.value)}
                    value={amount}
                />
                <FormButton type="submit">Add</FormButton>
            </form>
            {expenses.map((exp) => (
                <ExpensesListItem key={exp.id}>
                    <ExpenseType>{exp.type}</ExpenseType>
                    <ExpenseAmount>€{exp.amount}</ExpenseAmount>
                </ExpensesListItem>
            ))}
        </ExpensesList>
    );
}
