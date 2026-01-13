import FlexList from "./components/FlexList/FlexList.tsx";
import GridList from "./components/GridList/GridList.tsx";
import "./App.scss";
import { useState } from "react";

function App() {
  const [status, setStatus] = useState("flex");
  return (
    <div className="lists-container">
      <button onClick={() => setStatus("flex")}>Flex</button>
      <button onClick={() => setStatus("grid")}>Grid</button>
      {status === "flex" ? <FlexList /> : <GridList />}
    </div>
  );
}

export default App;
