import { useState, useContext } from "react";
import { boardContext } from "../../App";
import regions from "../../utils/region";
import backIcon from "../../assets/back-icon.png";

const Regions = ({ setRole }) => {
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
  const allRegions = Object.keys(region);
  const { setPokedex, setOpenForm } = useContext(boardContext);

  const handleAction = () => {
    const regionsChecked = Object.keys(region).filter(
      (key) => region[key] === true
    );
    const pokemonData = {};
    let pokeCount = 0;

    regionsChecked.forEach(async (key) => {
      const regionData = regions[key];
      const limit = regionData.amount;
      pokeCount += limit;

      for (let i = 0; i < limit; i++) {
        const res = await fetch(
          `https://pokeapi.co/api/v2/pokemon/${i + regionData.lower}`
        );
        const data = await res.json();
        const name = data.species.name;

        pokemonData[name] = {
          name: name,
          id: i + regionData.lower,
          sprite: data.sprites.front_default,
          found: false,
        };
      }
    });

    setPokedex((prevState) => ({
      ...prevState,
      pokemonData: pokemonData,
      ["regions"]: regionsChecked,
      pkmnCount: pokeCount,
    }));
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
    <form onSubmit={handleAction}>
      <div className="form-title">
        <img
          className="back"
          src={backIcon}
          alt="back"
          onClick={() => setRole("")}
        />
        <div>Select Region</div>
      </div>

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
  );
};

export default Regions;
