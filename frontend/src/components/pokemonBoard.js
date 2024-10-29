import mysteryIcon from "../assets/question-mark.png";

const PokemonBoard = ({ title, pokemonIds }) => {
  return (
    <div className="board">
      <div>{title}</div>
      <div className="pokemon-display">
        {pokemonIds.map((id) => {
          return (
            <img
              data-id={`pokeID-${id}`}
              src={mysteryIcon}
              key={id}
              alt="pokemon"
            />
          );
        })}
      </div>
    </div>
  );
};

export default PokemonBoard;
