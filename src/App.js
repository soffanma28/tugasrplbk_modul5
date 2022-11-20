import "./App.css";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { Button, IconButton, List, Paper, Typography } from "@mui/material";
import ListQuote from "./components/ListQuote";
import { useEffect, useState } from "react";
import axios from "axios";
import { AddCircle } from "@mui/icons-material";
import AddQuoteDialog from "./components/AddQuoteDialog";

const BASE_API_URL = `https://programming-quotes-api.herokuapp.com`;

function App() {
  const [quotes, setQuotes] = useState([]);
  const [newQuotes, setNewQuotes] = useState([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  // const [page, setPage] = useState(1);

  console.log(quotes);

  useEffect(() => {
    async function getQuotes() {
      await axios
        .get(`${BASE_API_URL}/Quotes/author/Soffan%20MA`, {
          // params: {
          //   page: page
          // }
        })
        .then((res) => {
          console.log(res.data);
          const responseData = res.data;
          setQuotes(responseData);
        })
        .catch((error) => {
          console.log(error);
          window.alert(error);
        });
    }

    getQuotes();
  }, []);

  const openDialog = () => {
    setIsDialogOpen(true);
  };

  const closeDialog = () => {
    setIsDialogOpen(false);
  };

  const handleDeleteUser = (userId, idx) => {
    async function delUser() {
      await axios
        .delete(`${BASE_API_URL}/quotes/${userId}`)
        .then((res) => {
          console.log(userId);
          console.log(idx);
          let arr = quotes;
          if (idx !== -1) {
            arr.splice(idx, 1);
          }
          setQuotes([...arr]);
        })
        .catch((error) => {
          console.log(error);
          window.alert(error);
        });
    }

    delUser();
  };

  return (
    <div className="App">
      <div className="list-container">
        <div className="list-title-wrapper">
          <Typography variant="h4">List Quotes</Typography>
          <IconButton onClick={openDialog}>
            <AddCircle />
          </IconButton>
        </div>
        <Paper elevation={2} style={{ maxHeight: "700px", overflow: "auto" }}>
          <List>
            {quotes.map((d, idx) => (
              <ListQuote
                key={d.id}
                primaryText={`${d.author}`}
                secondaryText={`Quote: ${d.en}`}
              />
            ))}
            {newQuotes.map((d) => (
              <ListQuote
                key={d.id}
                primaryText={d.author}
                secondaryText={`Quote: ${d.quote}`}
              />
            ))}
          </List>
          {/* <Button
            onClick={() => setPage((prev) => prev - 1)}
            disabled={page === 1}
          >
            Prev
          </Button>
          <Button onClick={() => setPage((prev) => prev + 1)}>Next</Button> */}
        </Paper>
      </div>
      {isDialogOpen && (
        <AddQuoteDialog
          open={isDialogOpen}
          onClose={closeDialog}
          quotes={newQuotes}
          setQuotes={setNewQuotes}
        />
      )}
    </div>
  );
}

export default App;
