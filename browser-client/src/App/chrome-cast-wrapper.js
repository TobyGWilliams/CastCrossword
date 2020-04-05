import React from "react";
import WrappedApplication from ".";

const APPLICATION_ID = "865DA20B";

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      connection: null,
    };
  }

  setConnection(value) {
    this.setState({ connection: value });
  }

  componentDidMount() {
    const initializeCastApi = () => {
      const { cast, chrome } = window;
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
    };

    window["__onGCastApiAvailable"] = function (isAvailable) {
      if (isAvailable) {
        initializeCastApi();
      }
    };
  }
  render() {
    return <WrappedApplication connection={this.state.connection} />;
  }
}
