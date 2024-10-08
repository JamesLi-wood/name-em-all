import { useContext, useRef, useState } from "react";
import { boardContext } from "../App";
import regions from "../utils/region";
import mystery from "../assets/question-mark.png";
import "./board.css";

const PokemonBoard = ({ title, pokemonIds }) => {
  return (
    <div className="board">
      <div>{title}</div>
      <div className="region-pokemons">
        {pokemonIds.map((id) => {
          return (
            <img id={`pokeID-${id}`} src={mystery} key={id} alt="pokemon" />
          );
        })}
      </div>
    </div>
  );
};

const RenderGuess = () => {
  const [guessCounter, setGuessCounter] = useState(0);
  const { pokedex, setOpenForm } = useContext(boardContext);
  const inputRef = useRef(null);

  const validate = () => {
    const inputName = inputRef.current.value;
    const currentName = pokedex.pokemonData[guessCounter].name;

    if (inputName === currentName) {
      setGuessCounter((prevState) => prevState + 1);
      inputRef.current.value = "";
    }
  };

  const handleEnterPress = (e) => {
    if (e.key === "Enter") {
      validate();
    }
  };

  return (
    <div className="guess-wrapper">
      <div className="guess-board">
        {guessCounter === 1025 ? (
          <div>Congratulations! You sucessfully named them all</div>
        ) : (
          <>
            <div>Guess the pokemon</div>
            <img src={pokedex.pokemonData[guessCounter].sprite} alt="pokemon" />
            <div>{`Correctly Guessed: ${guessCounter}`}</div>
            <div className="guessing-container">
              <input type="text" ref={inputRef} onKeyDown={handleEnterPress} />
              <button onClick={validate}>Enter</button>
            </div>
          </>
        )}

        <button onClick={() => setOpenForm(true)}>Back</button>
      </div>
    </div>
  );
};

const Board = () => {
  const { pokedex } = useContext(boardContext);

  const renderRegions = () => {
    return pokedex.mode.type.map((region) => {
      const startId = regions[region].lower;
      const pokemonIds = Array.from(
        { length: regions[region].amount },
        (_, idx) => startId + idx
      );

      return <PokemonBoard title={region} pokemonIds={pokemonIds} />;
    });
  };

  const renderType = () => {
    const pokemons = Object.values(pokedex.pokemonData).sort(
      (a, b) => a.id - b.id
    );
    const pokemonIds = pokemons.map((pokemon) => pokemon.id);

    return <PokemonBoard title={pokedex.mode.type} pokemonIds={pokemonIds} />;
  };

  const renderContent = () => {
    switch (pokedex.mode.name) {
      case "type":
        return renderType();
      case "regions":
        return renderRegions();
      case "guess":
        return <RenderGuess />;
      default:
        return null;
    }
  };

  return <div className="board-display">{renderContent()}</div>;
};

export default Board;
