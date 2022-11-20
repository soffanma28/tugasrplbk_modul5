import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    TextField
  } from "@mui/material";
  import axios from "axios";
  import React, { useState } from "react";
  
  const BASE_API_URL = `https://programming-quotes-api.herokuapp.com`;
  
  function AddQuoteDialog({ open, onClose, users, setUsers }) {
    const [author, setAuthor] = useState("Soffan MA");
    const [quote, setQuote] = useState("");
    const [job, setJob] = useState("");
  
    const handleSubmit = () => {
      axios
        .post(`${BASE_API_URL}/Quotes`, {
          id: "string",
          author: author,
          en: quote,
        })
        .then((res) => {
          setUsers([...users, res.data]);
          console.log(res.data);
        })
        .catch((error) => console.log(error));
    };
  
    return (
      <Dialog open={open} onClose={onClose}>
        <DialogTitle>Add quote</DialogTitle>
        <DialogContent
          style={{
            display: "flex",
            flexDirection: "column",
            gap: ".5rem",
            padding: "8px 20px"
          }}
        >
          <TextField
            name="quote"
            label="Quote"
            value={quote}
            onChange={(event) => setQuote(event.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Close</Button>
          <Button onClick={handleSubmit}>Add</Button>
        </DialogActions>
      </Dialog>
    );
  }
  
  export default AddQuoteDialog;
  