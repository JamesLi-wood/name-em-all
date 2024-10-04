import { useEffect, useState, useContext } from "react";
import { boardContext } from "../App";
import "./sidebar.css";

const Timer = ({ endTimer }) => {
  const [time, setTime] = useState(0);

  useEffect(() => {
    let timeIncrement;
    if (!endTimer) {
      timeIncrement = setInterval(() => {
        setTime((prevState) => prevState + 1);
      }, 1000);
    }

    return () => clearInterval(timeIncrement);
  }, [endTimer]);

  const formatTime = (time) => {
    const hours = Math.floor(time / 3600)
      .toString()
      .padStart(2, "0");
    const minutes = Math.floor((time % 3600) / 60)
      .toString()
      .padStart(2, "0");
    const seconds = (time % 60).toString().padStart(2, "0");

    return `${hours}:${minutes}:${seconds}`;
  };

  return <div>{formatTime(time)}</div>;
};

const Sidebar = () => {
  const { pokedex, setPokedex, setOpenForm, pkmnCount, setPkmnCount } =
    useContext(boardContext);
  const [endTimer, setEndTimer] = useState(false);

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
    setEndTimer(true);
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
    setPkmnCount((prevState) => {
      const increment = prevState + 1;

      if (increment === pokedex.pkmnCount) setEndTimer(true);

      return increment;
    });

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
      <Timer endTimer={endTimer} />
      {pokedex.pkmnCount === pkmnCount && (
        <div>Congratulations, you named them all! </div>
      )}
    </div>
  );
};

export default Sidebar;
