import { useState, createContext } from "react";
import { Form, Board, Sidebar } from "./components/index";
import "./App.css";

export const boardContext = createContext();

function App() {
  const [pokedex, setPokedex] = useState({
    mode: null,
    types: [],
    regions: [],
    pokemonData: {},
    pkmnCount: 0,
  });

  const [openForm, setOpenForm] = useState(true);
  const [pkmnCount, setPkmnCount] = useState(0);

  const contextValue = {
    pokedex,
    setPokedex,
    setOpenForm,
    pkmnCount,
    setPkmnCount,
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
