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
      pokemonData: {},
      regions: [],
      pokeType: null,
      pkmnCount: -1,
    });
    setPkmnCount(0);
    setOpenForm(true);
  };

  const reveal = () => {
    const pokemons = Object.values(pokedex.pokemonData);

    pokemons.forEach((pokemon) => {
      const id = pokemon.id;
      const doc = document.getElementById(`pokeID-${id}`);

      if (!doc.classList.contains("found")) {
        doc.classList.add("reveal");
        doc.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;
      }
    });
  };

  const handleChange = (e) => {
    const pokemon = pokedex.pokemonData[e.target.value];
    if (!pokemon || pokemon.found) return;

    const doc = document.getElementById(`pokeID-${pokemon.id}`);
    doc.src = pokemon.sprite;
    doc.classList.add("found");
    pokemon.found = true;
    setPkmnCount((prevState) => prevState + 1);

    e.target.value = "";
  };

  return (
    <div className="sidebar">
      <div>
        <div>{`Name all pokemon: ${pkmnCount}/${pokedex.pkmnCount}`}</div>
        <input className="pokemon-input" type="text" onChange={handleChange} />
      </div>
      <button onClick={reveal}>Reveal</button>
      <button onClick={reset}>Reset</button>
      <button onClick={view}>View Pokedex</button>
      {pokedex.pkmnCount === pkmnCount && (
        <div>Congratulations, you named them all! </div>
      )}
    </div>
  );
};

export default Sidebar;
