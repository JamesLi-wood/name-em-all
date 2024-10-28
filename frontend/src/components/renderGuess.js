import { useContext, useRef, useState } from "react";
import { boardContext } from "../App";

const RenderGuess = () => {
  const [guessCounter, setGuessCounter] = useState(1024);
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
    if (e.key === "Enter") validate();
  };

  const skip = () => {};
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
