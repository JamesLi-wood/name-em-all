import mystery from "../assets/question-mark.png";

const PokemonBoard = ({ title, pokemonIds }) => {
  return (
    <div className="board">
      <div>{title}</div>
      <div className="region-pokemons">
        {pokemonIds.map((id) => {
          return (
            <img
              data-id={`pokeID-${id}`}
              src={mystery}
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
