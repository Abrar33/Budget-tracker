import React, { useEffect, useState } from 'react'
import Overview from './Overview'
import Transaction from './Transaction'
import Container from '@mui/material/Container'
import { Typography } from '@mui/material'
const getLocalData=()=>{
  let data=localStorage.getItem('trans');
  if(data){
    return(JSON.parse(localStorage.getItem('trans')))
  }
  else{
    return[]
  }
}
export default function HomeComponents() {
  const [transactions,updateTransactions]=useState(getLocalData());
  const [expense,updateExpense]=useState(0);
  const [income,updateIncome]=useState(0);
  const addTransaction=(payload)=>{
const TransactionArray=[...transactions];
TransactionArray.push(payload);
updateTransactions(TransactionArray)
}
const CalculateBalance=()=>{
  let exp=0;
  let inc=0;
  transactions.map((payload)=>{
    payload.type==="EXPENSE"
    ?(exp=exp+payload.amount)
    :(inc=inc+payload.amount)
  })
  updateExpense(exp);
  updateIncome(inc);
}
  useEffect(() =>{CalculateBalance();
  localStorage.setItem('trans',JSON.stringify(transactions))},[transactions]);
  
  return (

    <>
    <Container maxWidth="sm" sx={{
      display:"flex",
      flexDirection:"column",
      textAlign:"center",
      bgcolor:"grey"
    }}>
      <Typography variant="h5" gutterBottom sx={{marginTop:"18px"}}>   
      BUDGET CALCULATOR
      </Typography>
    <Overview addTransaction={addTransaction} expense={expense} income={income}/>
    <Transaction transactions={transactions}/>
    </Container>
    </>
  )
}
