import React from "react";
import { AppBar, Toolbar, Typography } from "@mui/material";
import "./index.css";

const Index = () => {
  return (
    <AppBar position="fixed" sx={{ width: "100%" }} className="header">
      <Toolbar className="header-content">
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          <h1 className="text-center">Header</h1>
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Index;
