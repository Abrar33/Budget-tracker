import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  Input,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from "@mui/material";
import { Container } from "@mui/system";
import React, { useState } from "react";
const AddTransactionView = (props) => {
  const [amount, setAmount] = useState("");
  const [desc, setDesc] = useState("");
  const [type, setType] = useState("EXPENSE");
  const addTransaction = () => {
    props.addTransaction({
      amount: Number(amount),
      desc: String(desc),
      type,
      id: Date.now(),
    });
    console.log({ amount, desc, type });
    props.toggleTxn();
  };
  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        <TextField
          focus={{ outline: "none" }}
          id="filled-hidden-label-normal"
          defaultValue="Amount"
          value={amount}
          type="number"
          onChange={(e) => {
            setAmount(e.target.value);
          }}
          size="small"
        />
        <TextField
          hiddenLabel
          id="filled-hidden-label-normal"
          defaultValue="Desc"
          value={desc}
          type="string"
          onChange={(e) => {
            setDesc(e.target.value);
          }}
          sx={{ marginTop: "8px" }}
          size="small"
        />
        <FormControl>
          <RadioGroup
            aria-labelledby="demo-radio-buttons-group-label"
            defaultValue="female"
            name="radio-buttons-group"
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-evenly",
            }}
          >
            <FormControlLabel
              value="EXPENSE"
              control={<Radio />}
              label="Expense"
              checked={type === "EXPENSE"}
              onChange={(e) => {
                setType(e.target.value);
              }}
            />
            <FormControlLabel
              value="INCOME"
              control={<Radio />}
              label="Income"
              checked={type === "INCOME"}
              onChange={(e) => {
                setType(e.target.value);
              }}
            />
          </RadioGroup>
        </FormControl>
        <Button variant="contained" disableElevation onClick={addTransaction}>
          Add Transaction
        </Button>
      </Box>
    </>
  );
};
export default function Overview(props) {
  const [isAddTxnVisible, toggleTxn] = useState(false);

  return (
    <Container
      sx={{
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <Typography variant="h4" gutterBottom>
          ${props.income-props.expense}
        </Typography>
        <Button onClick={() => toggleTxn(!isAddTxnVisible)}>
          {isAddTxnVisible ? "Cancel" : "Add"}
        </Button>
      </Box>
      {isAddTxnVisible && (
        <AddTransactionView
          toggleTxn={toggleTxn}
          addTransaction={props.addTransaction}
        ></AddTransactionView>
      )}
      <Box sx={{ display: "flex", justifyContent: "space-evenly" }}>
        <Box>
          <Typography >Expense <Typography sx={{ fontWeight:"bold", color:"crimson"}}>${props.expense}</Typography></Typography>
        </Box>
        <Box>
          <Typography >Income <Typography sx={{fontWeight:"bold",color:"green"}}>${props.income}</Typography></Typography>
        </Box>
      </Box>
    </Container>
  );
}
