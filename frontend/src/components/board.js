import { useContext } from "react";
import { boardContext } from "../App";
import regions from "../utils/region";
import mystery from "../assets/question-mark.png";
import "./board.css";

const Board = () => {
  const { pokedex } = useContext(boardContext);

  const renderItems = (region) => {
    const elems = [];
    const pokeId = regions[region].lower - 1;

    for (let i = 1; i <= regions[region].amount; i++) {
      elems.push(
        <img
          src={mystery}
          alt="pokemon"
          key={pokeId + i}
          id={`pokeID-${pokeId + i}`}
        />
      );
    }

    return elems;
  };

  return (
    <div className="board-display">
      {pokedex.regions.map((region) => {
        return (
          <div className={`${region}-board`}>
            <div>{region}</div>
            <div className="region-pokemons">{renderItems(region)}</div>
          </div>
        );
      })}
    </div>
  );
};

export default Board;
