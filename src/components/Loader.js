import { Typography } from "@material-ui/core";
import React from "react";

const Loader = () => {
  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Typography variant="h4" component="h4">
        Loading ...
      </Typography>
    </div>
  );
};

export default Loader;
