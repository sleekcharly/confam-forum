import React from "react";
import "./App.css";
import LeftMenu from "./components/areas/LeftMenu";
import Main from "./components/areas/main/Main";
import Nav from "./components/areas/Nav";
import RightMenu from "./components/areas/RightMenu";
import SideBar from "./components/areas/sidebar/SideBar";

function App() {
  return (
    <div className="App">
      <Nav />
      <SideBar />
      <LeftMenu />
      <Main />
      <RightMenu />
    </div>
  );
}

export default App;
