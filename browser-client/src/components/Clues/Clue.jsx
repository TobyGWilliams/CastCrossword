import React, { Fragment } from "react";

import { IconButton, TextField } from "@material-ui/core";
import AddToQueue from "@material-ui/icons/AddToQueue";

import htmlDecode from "../../util/html-decode";
import { verticalAlignCenter } from "../../styles";

export default ({ clue, onClick, onChange }) => {
  return (
    <Fragment>
      <div style={{ ...verticalAlignCenter }}>
        {htmlDecode(clue.description)}
      </div>
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
};
