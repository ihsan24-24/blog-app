import React from "react";

import { BrowserRouter } from "react-router-dom";
import NavbarComp from "./components/Navbar";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <NavbarComp />
        <h1>Legendcx</h1>
      </BrowserRouter>
    </div>
  );
}

export default App;
