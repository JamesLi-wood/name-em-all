import { useState, useContext } from "react";
import { boardContext } from "../App";
import regions from "../utils/region";
import "./form.css";

const Form = () => {
  const [region, setRegion] = useState({
    Kanto: false,
    Jhoto: false,
    Hoenn: false,
    Sinnoh: false,
    Unova: false,
    Kalos: false,
    Alola: false,
    Galar: false,
    Hisui: false,
    Paldea: false,
  });
  const { setPokedex, setOpenForm } = useContext(boardContext);
  const allRegions = Object.keys(region);

  const handleAction = (e) => {
    e.preventDefault();
    const checked = Object.keys(region).filter((key) => region[key] === true);
    setPokedex((prevState) => ({
      ...prevState,
      ["regions"]: checked,
    }));
    let pkmnCount = 0;

    checked.forEach(async (key) => {
      const regionData = regions[key];
      const limit = regionData.amount;
      pkmnCount += limit;

      const pokemonData = {};
      const fetchPromises = [];
      for (let i = 0; i < limit; i++) {
        fetchPromises.push(
          fetch(`https://pokeapi.co/api/v2/pokemon/${i + regionData.lower}`)
            .then((res) => res.json())
            .then((data) => {
              const name = data.species.name;
              pokemonData[name] = {
                name: name,
                id: i + regionData.lower,
                sprite: data.sprites.front_default,
                found: false,
              };
            })
        );
      }

      await Promise.all(fetchPromises);

      setPokedex((prevState) => ({
        ...prevState,
        pokemonData,
        pkmnCount: pkmnCount,
      }));
    });

    setOpenForm(false);
  };

  const activateChange = (region) => {
    document.getElementById(region).click();
  };

  const handleChange = (e) => {
    const { id, checked } = e.target;
    setRegion((prevState) => ({
      ...prevState,
      [id]: checked,
    }));
  };

  return (
    <div className="form-wrapper">
      <form onSubmit={handleAction}>
        <div>Select Region</div>
        <div className="region-selection">
          {allRegions.map((data) => {
            return (
              <div key={data} onClick={() => activateChange(data)}>
                <input type="checkbox" id={data} onChange={handleChange} />
                <label htmlFor={data}>{data}</label>
              </div>
            );
          })}
        </div>
        <input type="submit" />
      </form>
    </div>
  );
};

export default Form;
