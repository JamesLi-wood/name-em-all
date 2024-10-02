import { useContext } from "react";
import { boardContext } from "../../App";
import backIcon from "../../assets/back-icon.png";

const Types = ({ setRole }) => {
  const { setPokedex, setOpenForm } = useContext(boardContext);
  const pokeTypes = [
    "bug",
    "dark",
    "dragon",
    "electric",
    "fairy",
    "fighting",
    "fire",
    "flying",
    "ghost",
    "grass",
    "ground",
    "ice",
    "normal",
    "poison",
    "psychic",
    "rock",
    "steel",
    "water",
  ];

  const selectType = async (type) => {
    const response = await fetch(`https://pokeapi.co/api/v2/type/${type}`);
    const pkmnData = await response.json();
    const pokemonList = pkmnData.pokemon;

    const pokemonData = {};
    let pokeCount = 0;

    const pokemonPromises = pokemonList.map((pkmn) =>
      fetch(pkmn.pokemon.url).then((res) => res.json())
    );

    const pokemonDetails = await Promise.all(pokemonPromises);

    pokemonDetails.forEach((data) => {
      const name = data.species.name;
      if (!pokemonData[name]) {
        pokemonData[name] = {
          name: name,
          id: data.id,
          sprite: data.sprites.front_default,
          found: false,
        };
        pokeCount++;
      }
    });

    setPokedex((prevState) => ({
      ...prevState,
      pokemonData: pokemonData,
      pokeType: type,
      pkmnCount: pokeCount,
    }));
    setOpenForm(false);
  };

  return (
    <form>
      <div className="form-title">
        <img
          className="back"
          src={backIcon}
          alt="back"
          onClick={() => setRole("")}
        />
        <div>Select Type</div>
      </div>

      <div className="region-selection">
        {pokeTypes.map((data) => {
          return (
            <div key={data} onClick={() => selectType(data)}>
              {data}
            </div>
          );
        })}
      </div>
    </form>
  );
};

export default Types;
