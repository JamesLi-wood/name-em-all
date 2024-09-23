import { useContext } from "react";
import { boardContext } from "../App";
import "./sidebar.css";

const Sidebar = () => {
  const { pokedex, setPokedex, setOpenForm } = useContext(boardContext);

  const view = () => {
    console.log(pokedex);
  };

  const reset = () => {
    setPokedex({
      regions: [],
    });
    setOpenForm(true);
  };

  const handleChange = (e) => {
    if (!pokedex[e.target.value] || e.target.value === "regions") return;

    if (pokedex[e.target.value].found) return;

    const pokemon = pokedex[e.target.value];
    pokemon.found = true;
    document.getElementById(`pokeID-${pokemon.id}`).src = pokemon.sprite;

    e.target.value = "";
  };

  return (
    <div className="sidebar">
      <button onClick={reset}>Reset</button>
      <button onClick={view}>View Pokedex</button>
      <input type="text" placeholder="Search" onChange={handleChange} />
    </div>
  );
};

export default Sidebar;
