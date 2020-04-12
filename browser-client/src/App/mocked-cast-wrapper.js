import React, { useState } from "react";
import WrappedApplication from ".";

const APPLICATION_ID = process.env.REACT_APP_CAST_APPLICATION_ID;

export default () => {
  const [connection, setConnection] = useState(null);
  const button = (
    <div>
      <button
        onClick={() => {
          setConnection("CONNECTED");
        }}
      >
        connection
      </button>
    </div>
  );

  return (
    <WrappedApplication connection={connection} googleCastButton={button} />
  );
};
