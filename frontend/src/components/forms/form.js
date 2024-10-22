import { useState, useContext } from "react";
import { boardContext } from "../../App";
import "./form.css";
import FormMode from "./formMode";
import pokeRegions from "../../utils/pokeRegions";
import formOptions from "../../utils/formOptions";

const Form = () => {
  const [view, setView] = useState("Main");
  const { setPokedex, setOpenForm } = useContext(boardContext);

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

  const back = () => {
    setView("Main");
  };

  const handleRegionSubmit = async (e, regions) => {
    e.preventDefault();

    const selectedOptions = Object.keys(regions).filter(
      (key) => regions[key] === true
    );
    const pokemonData = {};
    let pkmnCount = 0;

    const regionPromises = selectedOptions.map(async (region) => {
      const regionData = pokeRegions[region];
      const limit = regionData.amount;
      pkmnCount += limit;

      const pkmnPromises = [];
      for (let i = 0; i < limit; i++) {
        pkmnPromises.push(
          fetch(
            `https://pokeapi.co/api/v2/pokemon/${i + regionData.lower}`
          ).then((res) => res.json())
        );
      }

      const pokemonDetails = await Promise.all(pkmnPromises);
      pokemonDetails.forEach((data) => {
        const name = data.species.name;
        pokemonData[name] = {
          name: name,
          id: data.id,
          sprite: data.sprites.front_default,
          found: false,
        };
      });
    });

    await Promise.all(regionPromises);

    setPokedex((prevState) => ({
      ...prevState,
      mode: "regions",
      regions: selectedOptions,
      pokemonData: pokemonData,
      pkmnCount: pkmnCount,
    }));
    setOpenForm(false);
  };

  const handleTypeSubmit = async (e, types) => {
    e.preventDefault();

    const selectedOptions = Object.keys(types).filter(
      (key) => types[key] === true
    );
    const pokemonData = {};
    let pokeCount = 0;

    const typePromises = selectedOptions.map(async (type) => {
      const response = await fetch(`https://pokeapi.co/api/v2/type/${type}`);
      const pkmnData = await response.json();
      const pkmnList = pkmnData.pokemon;

      const pkmnPromises = pkmnList.map(async (pkmn) => {
        return await fetch(pkmn.pokemon.url).then((res) => res.json());
      });

      const pokemonDetails = await Promise.all(pkmnPromises);
      pokemonDetails.forEach((pkmn) => {
        const name = pkmn.species.name;
        const pkmnType = pkmn.types.map((data) => data.type.name);

        if (!pokemonData[name]) {
          pokemonData[name] = {
            name: name,
            id: pkmn.id,
            sprite: pkmn.sprites.front_default,
            found: false,
            type: pkmnType,
          };
          pokeCount++;
        }
      });
    });

    await Promise.all(typePromises);

    setPokedex((prevState) => ({
      ...prevState,
      mode: "types",
      types: selectedOptions,
      pokemonData: pokemonData,
      pkmnCount: pokeCount,
    }));
    setOpenForm(false);
  };

  const submitHandlers = {
    Regions: handleRegionSubmit,
    Types: handleTypeSubmit,
  };

  const modes = Object.keys(formOptions);
  return (
    <div className="form-wrapper">
      {view === "Main" ? (
        <form>
          <div className="form-title">Select Mode</div>
          <div className="option-selection">
            {modes.map((mode) => {
              return <div onClick={() => setView(mode)}>{mode}</div>;
            })}
            <div onClick={guess}>Guess</div>
          </div>
        </form>
      ) : (
        <FormMode
          mode={view}
          options={formOptions[view]}
          back={back}
          handleSubmit={submitHandlers[view]}
        />
      )}
    </div>
  );
};

export default Form;
