import { boardContext } from "./App";
import { useContext } from "react";
import regions from "./region";
import "./board.css";

const Board = () => {
  const { pokedex } = useContext(boardContext);

  const renderItems = (region) => {
    const elems = [];
    const pokeId = regions[region].lower - 1;

    for (let i = 1; i <= regions[region].amount; i++) {
      elems.push(<div key={pokeId + i} id={`pokeID-${pokeId + i}`}></div>);
    }

    return elems;
  };

  return (
    <div className="board-display">
      {pokedex.regions.map((region) => {
        return (
          <>
            <div>{region}</div>
            <div className="region-pokemons">{renderItems(region)}</div>
          </>
        );
      })}
    </div>
  );
};

export default Board;
