import { FormControl, Input, InputAdornment, InputLabel, TextField, Typography } from '@mui/material'
import { Container } from '@mui/system'
import React, { useEffect, useState } from 'react'
import styled from 'styled-components';
const Cell=styled.div`
display:flex;
flex-direction:row;
padding:10px 15px;
font-size:14px;
border-radius:2px;
align-item:center;
font-weight:normal;
justify-content:space-between;
width:90%;
border:4px solid ${(props)=>(props.isExpense ? "red":"green")};
background-color:${(props)=>(props.isExpense ? "red":"green")};
border-top-left-radius:33px;
border-top-right-radius:33px;
border-bottom-left-radius:33px;
border-bottom-right-radius:33px;
margin-top:23px
`
const TransactionCell=(props)=>{
  return(
    <Cell isExpense={props.payload?.type==="EXPENSE"} 
  >
      <Typography>{props.payload.desc}</Typography>
      <Typography>${props.payload.amount}</Typography>
    </Cell>
  )}
export default function Transaction(props) {
  const [SearchText,updateSearchText]=useState("")
  const [filteredTransaction,updateTxn] = useState(props.transactions)
  const filterData=()=>{
    if(!SearchText || !SearchText.trim().length){
      updateTxn(props.transactions);
      return;
    }
    let txn=[...props.transactions];
    txn=txn.filter((payload)=>
    payload.desc.toLowerCase().includes(SearchText.toLowerCase().trim()))
updateTxn(txn)
  };
  useEffect(()=>filterData(SearchText),[props.transactions]) 
  return (
    <>
    <Container>
    <Typography variant="h6" display="flex" gutterBottom sx={{bgcolor:"",marginTop:"14px"}}>
        Transactions
      </Typography>
      <TextField id="standard-basic" label="Search" variant="standard" value={SearchText}
      onChange={(e)=>{updateSearchText(e.target.value)
      filterData(e.target.value)}} />
      {filteredTransaction?.length
      ?filteredTransaction.map((payload)=>(
        <TransactionCell payload={payload}/>
      ))
      :""}
    </Container>
      
    </>
  )
}
