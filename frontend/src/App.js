import { useState } from "react";
import Form from "./form";

function App() {
  const [pokedex, setPokedex] = useState({});
  const [openForm, setOpenForm] = useState(true);
  
  const view = () => {
    console.log(pokedex);
  };

  const reset = () => {
    setPokedex({});
    setOpenForm(true);
  };

  return (
    <div>
      {openForm && <Form setPokedex={setPokedex} setOpenForm={setOpenForm} />}
      <button onClick={reset}>Reset</button>
      <button onClick={view}>View Pokedex</button>
    </div>
  );
}

export default App;
