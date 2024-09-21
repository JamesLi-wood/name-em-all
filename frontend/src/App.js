import { useState, createContext } from "react";
import { Form, Board, Sidebar } from "./components/index";
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
