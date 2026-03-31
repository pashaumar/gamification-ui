import { useState } from "react";

import "./App.css";

import Sidebar from "./components/sidebar/Sidebar";
import Header from "./components/header/Header";
import Content from "./components/content/Content";

function App() {
  const [currentTab] = useState("gamification");

  return (
    <div className="w-full h-screen flex">
      <Sidebar currentTab={currentTab} />
      <div className="h-full flex-1 flex flex-col items-center gap-8">
        <Header />
        <Content />
      </div>
    </div>
  );
}

export default App;
