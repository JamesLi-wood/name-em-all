import { useContext } from "react";
import { boardContext } from "../App";
import regions from "../utils/region";
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
      pkmnCount: -1,
    });
    setPkmnCount(0);
    setOpenForm(true);
  };

  const reveal = () => {
    pokedex.regions.map((region) => {
      const pokemonRegion = regions[region];

      for (let i = 0; i < pokemonRegion.amount; i++) {
        const id = pokemonRegion.lower + i;
        const doc = document.getElementById(`pokeID-${id}`);

        if (!doc.classList.contains("found")) {
          doc.classList.add("reveal");
          doc.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;
        }
      }
    });

    setPokedex((prevState) => ({
      ...prevState,
      pokemonData: {},
    }));
  };

  const handleChange = (e) => {
    const pokemon = pokedex.pokemonData[e.target.value];
    if (!pokemon || pokemon.found) return;

    pokemon.found = true;
    const doc = document.getElementById(`pokeID-${pokemon.id}`);
    doc.src = pokemon.sprite;
    doc.classList.add("found");
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
