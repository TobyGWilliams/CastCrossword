import React, { Fragment } from "react";

import { IconButton, TextField } from "@material-ui/core";
import AddToQueue from "@material-ui/icons/AddToQueue";

const htmlDecode = input => {
  const doc = new DOMParser().parseFromString(input, "text/html");
  return doc.documentElement.textContent;
};

export default ({ clue, onClick }) => (
  <Fragment>
    <div style={{ margin: "auto 0" }}>{htmlDecode(clue)}</div>
    <TextField />
    <IconButton variant="contained" onClick={onClick}>
      <AddToQueue />
    </IconButton>
  </Fragment>
);
