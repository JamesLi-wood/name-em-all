import { useContext } from "react";
import { pokeRegions } from "../utils";
import { boardContext } from "../App";
import RenderGuess from "./renderGuess";
import PokemonBoard from "./pokemonBoard";
import "./board.css";

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
        .filter(
          (pokemon) => pokemon.type[0] === type || pokemon.type[1] === type
        )
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
