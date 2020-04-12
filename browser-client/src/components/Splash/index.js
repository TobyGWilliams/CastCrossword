import React, { useState } from "react";

import {
  Button,
  Stepper,
  Step,
  StepLabel,
  IconButton,
} from "@material-ui/core";

import { centerText } from "../../styles";

const getActiveStep = (isConnection, isPuzzle) => {
  if (!isConnection) return 0;
  if (isConnection && !isPuzzle) return 1;
  if (isConnection && isPuzzle) return 2;
  return 0;
};

export default ({
  onSelectPuzzle,
  isPuzzle,
  isConnection,
  googleCastButton,
}) => {
  const activeStep = getActiveStep(isConnection, isPuzzle);

  const steps = [
    <div>Connect to your Chromecast{googleCastButton}</div>,
    <div>Select your puzzle</div>,
    "Enjoy with friends",
  ];

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        height: activeStep === 0 ? "100vh" : "auto",
      }}
    >
      <div>
        <h1 style={{ ...centerText, fontSize: "7em", margin: 0 }}>
          CastCrossword
        </h1>
        <h3 style={{ ...centerText, marginBottom: "30px" }}>
          Share your crossword on the big screen
        </h3>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            width: "75%",
            margin: "auto",
          }}
        >
          <Stepper
            alternativeLabel
            activeStep={activeStep}
            style={{ width: "100%" }}
          >
            {steps.map((label) => {
              return (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              );
            })}
          </Stepper>
        </div>
      </div>
    </div>
  );
};
