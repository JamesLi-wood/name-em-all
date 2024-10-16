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

  const handleAction = async (e) => {
    e.preventDefault();

    const regionsChecked = Object.keys(region).filter(
      (key) => region[key] === true
    );
    const pokemonData = {};
    let pokeCount = 0;

    const regionPromises = regionsChecked.map(async (key) => {
      const regionData = regions[key];
      const limit = regionData.amount;
      pokeCount += limit;

      const pokemonPromises = [];
      for (let i = 0; i < limit; i++) {
        pokemonPromises.push(
          fetch(
            `https://pokeapi.co/api/v2/pokemon/${i + regionData.lower}`
          ).then((res) => res.json())
        );
      }

      const pokemonDetails = await Promise.all(pokemonPromises);
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
      regions: regionsChecked,
      pokemonData: pokemonData,
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
