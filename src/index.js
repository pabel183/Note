import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import Home from "./route/pages/Home";
const root=ReactDOM.createRoot(document.getElementById("root"));

root.render(
          <React.Fragment>
           <Home />
            {/* <App /> */}
          </React.Fragment>
);