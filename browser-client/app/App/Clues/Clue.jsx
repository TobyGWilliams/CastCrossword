import React, { Fragment } from "react";

import { IconButton, TextField } from "@material-ui/core";
import AddToQueue from "@material-ui/icons/AddToQueue";

import htmlDecode from '../../util/html-decode'

console.log(htmlDecode)

const verticalAlignCenter = { margin: "auto 0" };

export default ({ clue, onClick, onChange }) => (
  <Fragment>
    <div style={{ ...verticalAlignCenter }}>{htmlDecode(clue)}</div>
    <div style={{ ...verticalAlignCenter }}>
      <TextField
        onChange={event => {
          const {
            target: { value }
          } = event;
          onChange(value);
        }}
      />
    </div>
    <IconButton color="primary" aria-label="upload picture" onClick={onClick}>
      <AddToQueue />
    </IconButton>
  </Fragment>
);
