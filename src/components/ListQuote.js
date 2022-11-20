import {
    ListItem,
    ListItemText,
    Typography
  } from "@mui/material";
  import React from "react";
  
  function ListQuote({ primaryText, secondaryText }) {
    return (
      <ListItem>
        <ListItemText
          primary={<Typography variant="h6">{primaryText}</Typography>}
          secondary={<Typography variant="p">{secondaryText}</Typography>}
        />
      </ListItem>
    );
  }
  
  export default ListQuote;
  