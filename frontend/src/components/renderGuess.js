import { useContext, useRef, useState } from "react";
import { boardContext } from "../App";
import useCounter from "../hooks/useCounter";

const RenderGuess = () => {
  const [position, setPosition] = useState(0);
  const [counter, incrementCounter] = useCounter();
  const { pokedex, setOpenForm } = useContext(boardContext);
  const inputRef = useRef(null);

  const validate = () => {
    const inputName = inputRef.current.value;
    const currentName = pokedex.pokemonData[position].name;

    if (inputName === currentName) {
      incrementCounter();
      setPosition((prevState) => prevState + 1);
      inputRef.current.value = "";
    }
  };

  const handleEnterPress = (e) => {
    if (e.key === "Enter") validate();
  };

  const skip = () => {
    setPosition((prevState) => prevState + 1);
    inputRef.current.value = "";
  };

  return (
    <div className="guess-wrapper">
      <div className="guess-board">
        {position === 1025 ? (
          <div>{`You have named ${counter} pokemons out of 1025!`}</div>
        ) : (
          <>
            <div>Guess the pokemon</div>
            <img src={pokedex.pokemonData[position].sprite} alt="pokemon" />
            <div>{`Correctly Guessed: ${counter}`}</div>
            <div className="guessing-container">
              <input type="text" ref={inputRef} onKeyDown={handleEnterPress} />
              <button onClick={validate}>Enter</button>
              <button onClick={skip}>Skip</button>
            </div>
          </>
        )}

        <button onClick={() => setOpenForm(true)}>Back</button>
      </div>
    </div>
  );
};

export default RenderGuess;
