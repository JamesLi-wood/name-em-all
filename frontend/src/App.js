import { useState, createContext } from "react";
import Form from "./form";
import Board from "./board";
import Sidebar from "./sidebar";
import "./App.css";

export const boardContext = createContext();

function App() {
  const [pokedex, setPokedex] = useState({
    regions: [],
  });
  const [openForm, setOpenForm] = useState(true);

  const contextValue = {
    pokedex,
    setPokedex,
    setOpenForm,
  };

  return (
    <boardContext.Provider value={contextValue}>
      {openForm ? (
        <Form />
      ) : (
        <div className="app-display">
          <Sidebar />
          <Board />
        </div>
      )}
    </boardContext.Provider>
  );
}

export default App;
