import { useContext } from "react";
import { boardContext } from "../App";
import "./sidebar.css";

const Sidebar = () => {
  const { pokedex, setPokedex, setOpenForm, pkmnCount, setPkmnCount } =
    useContext(boardContext);

  // Testing purposes
  const view = () => {
    console.log(pokedex);
  };

  const reset = () => {
    setPokedex({
      regions: [],
    });
    setPkmnCount(0);
    setOpenForm(true);
  };

  const handleChange = (e) => {
    const pokemon = pokedex.pokemonData[e.target.value];
    if (!pokemon || pokemon.found) return;

    pokemon.found = true;
    document.getElementById(`pokeID-${pokemon.id}`).src = pokemon.sprite;
    setPkmnCount((prevState) => prevState + 1);

    e.target.value = "";
  };

  return (
    <div className="sidebar">
      <button onClick={reset}>Reset</button>
      <button onClick={view}>View Pokedex</button>
      <div>
        <div>{`Name all pokemon: ${pkmnCount}/${pokedex.pkmnCount}`}</div>
        <input className="pokemon-input" type="text" onChange={handleChange} />
      </div>
    </div>
  );
};

export default Sidebar;
