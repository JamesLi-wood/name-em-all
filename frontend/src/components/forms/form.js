import { useState, useContext } from "react";
import { boardContext } from "../../App";
import Regions from "./regions";
import Types from "./types";
import "./form.css";

const formComponents = {
  regions: (props) => <Regions {...props} />,
  types: (props) => <Types {...props} />,
};

const Form = () => {
  const [role, setRole] = useState("");
  const { setPokedex, setOpenForm } = useContext(boardContext);
  const RenderFormComponent = formComponents[role];

  const guess = async () => {
    const pokemonPromises = [];
    for (let i = 1; i <= 1025; i++) {
      pokemonPromises.push(
        fetch(`https://pokeapi.co/api/v2/pokemon/${i}`).then((res) =>
          res.json()
        )
      );
    }

    const pokemonDetails = await Promise.all(pokemonPromises);

    const pokemonData = pokemonDetails.map((pokemon) => ({
      id: pokemon.id,
      name: pokemon.species.name,
      sprite: pokemon.sprites.front_default,
    }));

    for (let i = pokemonData.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      [pokemonData[i], pokemonData[j]] = [pokemonData[j], pokemonData[i]];
    }

    setOpenForm(false);
    setPokedex((prevState) => ({
      ...prevState,
      mode: "guess",
      pokemonData: pokemonData,
    }));
  };

  return (
    <div className="form-wrapper">
      {role ? (
        <RenderFormComponent setRole={setRole} />
      ) : (
        <form>
          <div className="form-title">Select Mode</div>
          <div className="region-selection">
            <div onClick={() => setRole("regions")}>Regions</div>
            <div onClick={() => setRole("types")}>Types</div>
            <div onClick={guess}>Guess</div>
          </div>
        </form>
      )}
    </div>
  );
};

export default Form;
