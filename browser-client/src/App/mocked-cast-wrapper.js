import React, { useState } from "react";

import IconButton from "@material-ui/core/IconButton";
import CastIcon from "@material-ui/icons/CastOutlined";

import WrappedApplication from ".";

export default () => {
  const [connectionStatus, setConnection] = useState(null);

  const session = {
    sendMessage: (channel) => {
      console.log(channel);
      return Promise.resolve("success");
    },
  };
  const instance = { getCurrentSession: () => session };
  const cast = { framework: { CastContext: { getInstance: () => instance } } };

  const button = (
    <div style={{ marginTop: "10px" }}>
      <IconButton
        onClick={() => {
          setConnection("CONNECTED");
        }}
        aria-label="delete"
      >
        <CastIcon />
      </IconButton>
    </div>
  );

  return (
    <WrappedApplication
      connectionStatus={connectionStatus}
      cast={cast}
      googleCastButton={button}
    />
  );
};
