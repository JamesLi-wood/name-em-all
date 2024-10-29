import { useContext } from "react";
import { useCounter, useTimer } from "../hooks";
import { boardContext } from "../App";
import "./sidebar.css";

const Sidebar = () => {
  const { pokedex, setPokedex, setOpenForm } = useContext(boardContext);
  const [counter, incrementCounter, resetCounter] = useCounter();
  const [formatTime, endTimer] = useTimer();

  const reset = () => {
    setPokedex({
      mode: null,
      types: [],
      regions: [],
      pokemonData: {},
      pkmnCount: 0,
    });
    resetCounter();
    setOpenForm(true);
  };

  const reveal = () => {
    endTimer();

    const pokemons = Object.values(pokedex.pokemonData);
    pokemons.forEach((pokemon) => {
      const id = pokemon.id;
      const elements = document.querySelectorAll(
        `[data-id='pokeID-${pokemon.id}']`
      );
      elements.forEach((doc) => {
        if (!doc.classList.contains("found")) {
          doc.classList.add("reveal");
          doc.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;
        }
      });
    });
  };

  const handleChange = (e) => {
    const input = e.target.value.toLowerCase();
    const pokemon = pokedex.pokemonData[input];
    if (!pokemon || pokemon.found) return;

    pokemon.found = true;

    const elements = document.querySelectorAll(
      `[data-id='pokeID-${pokemon.id}']`
    );
    elements.forEach((doc) => {
      doc.src = pokemon.sprite;
      doc.classList.add("found");
    });

    if (counter + 1 === pokedex.pkmnCount) endTimer();
    incrementCounter();

    e.target.value = "";
  };

  return (
    <>
      {pokedex.mode !== "guess" && (
        <div className="sidebar">
          <div>
            <div>{`Name all pokemon: ${counter}/${pokedex.pkmnCount}`}</div>
            <input
              className="pokemon-input"
              type="text"
              onChange={handleChange}
            />
          </div>
          <button onClick={reveal}>Reveal</button>
          <button onClick={reset}>Reset</button>
          <div>{formatTime()}</div>
          {counter === pokedex.pkmnCount && (
            <div>Congratulations, you named them all! </div>
          )}
        </div>
      )}
    </>
  );
};

export default Sidebar;
