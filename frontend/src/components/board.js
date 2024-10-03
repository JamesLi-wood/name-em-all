import { useContext } from "react";
import { boardContext } from "../App";
import regions from "../utils/region";
import mystery from "../assets/question-mark.png";
import "./board.css";

const PokemonBoard = ({ title, pokemonIds }) => {
  return (
    <div className={`${title}-board`}>
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

const Board = () => {
  const { pokedex } = useContext(boardContext);

  const renderRegions = () => {
    return pokedex.regions.map((region) => {
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

    return <PokemonBoard title={pokedex.pokeType} pokemonIds={pokemonIds} />;
  };

  return (
    <div className="board-display">
      {pokedex.pokeType ? renderType() : renderRegions()}
    </div>
  );
};

export default Board;
