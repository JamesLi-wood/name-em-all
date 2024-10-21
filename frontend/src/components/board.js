import { useContext, useRef, useState } from "react";
import { boardContext } from "../App";
import pokeRegions from "../utils/pokeRegions";
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
    return pokedex.regions.map((region) => {
      const startId = pokeRegions[region].lower;
      const pokemonIds = Array.from(
        { length: pokeRegions[region].amount },
        (_, idx) => startId + idx
      );

      return (
        <PokemonBoard key={region} title={region} pokemonIds={pokemonIds} />
      );
    });
  };

  const renderType = () => {
    return pokedex.types.map((type) => {
      const pokemonIds = Object.values(pokedex.pokemonData)
        .filter((pokemon) => pokemon.type === type)
        .map((data) => data.id);

      return <PokemonBoard key={type} title={type} pokemonIds={pokemonIds} />;
    });
  };

  const renderContent = () => {
    switch (pokedex.mode) {
      case "types":
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
