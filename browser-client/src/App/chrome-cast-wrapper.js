import React from "react";
import WrappedApplication from ".";

const APPLICATION_ID = process.env.REACT_APP_CAST_APPLICATION_ID;

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      connectionStatus: null,
    };
  }

  setConnection(value) {
    this.setState({ connection: value });
  }

  componentDidMount() {
    const initializeCastApi = () => {
      const { cast, chrome } = window;

      try {
        const context = cast.framework.CastContext.getInstance();

        context.setOptions({
          receiverApplicationId: APPLICATION_ID,
          autoJoinPolicy: chrome.cast.AutoJoinPolicy.ORIGIN_SCOPED,
        });

        context.addEventListener(
          cast.framework.CastContextEventType.SESSION_STATE_CHANGED,
          (event) => {
            switch (event.sessionState) {
              case cast.framework.SessionState.SESSION_STARTED:
                this.setConnection("CONNECTED");
                break;
              case cast.framework.SessionState.SESSION_ENDED:
                this.setConnection(null);
                break;
              default:
                break;
            }
          }
        );
      } catch (err) {
        console.err(err);
      }
    };

    window["__onGCastApiAvailable"] = function (isAvailable) {
      if (isAvailable) {
        initializeCastApi();
      }
    };
  }

  render() {
    const button = (
      <div style={{ margin: "5px auto" }}>
        <IconButton aria-label="delete">
          <span style={{ width: "1em" }}>
            {<google-cast-launcher></google-cast-launcher>}
          </span>
        </IconButton>
      </div>
    );

    return (
      <WrappedApplication
        connectionStatus={this.state.connectionStatus}
        googleCastButton={button}
      />
    );
  }
}
