import { useContext } from "react";
import { boardContext } from "../App";
import regions from "../utils/region";
import mystery from "../assets/question-mark.png";
import "./board.css";

const Board = () => {
  const { pokedex } = useContext(boardContext);

  const renderItems = () => {
    const elems = [];

    // Render the type board
    if (pokedex.pokeType !== null) {
      const pokemons = Object.values(pokedex.pokemonData).sort(
        (a, b) => a.id - b.id
      );

      const dummy = [];
      pokemons.map((pokemon) => {
        dummy.push(
          <img
            id={`pokeID-${pokemon.id}`}
            src={mystery}
            key={pokemon.id}
            alt="pokemon"
          />
        );
      });

      elems.push(
        <div className="type-board">
          <div>{pokedex.pokeType}</div>
          <div className="region-pokemons">{dummy}</div>
        </div>
      );

      // Render the region board
    } else {
      pokedex.regions.map((region) => {
        const pokeId = regions[region].lower - 1;

        const dummy = [];
        for (let i = 1; i <= regions[region].amount; i++) {
          dummy.push(
            <img
              id={`pokeID-${pokeId + i}`}
              src={mystery}
              key={pokeId + i}
              alt="pokemon"
            />
          );
        }

        elems.push(
          <div className={`${region}-board`}>
            <div>{region}</div>
            <div className="region-pokemons">{dummy}</div>
          </div>
        );
      });
    }

    return elems;
  };

  return <div className="board-display">{renderItems()}</div>;
};

export default Board;
