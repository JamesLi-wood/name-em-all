import { useState } from "react";
import regions from "./region";
import "./form.css";

const Form = ({ setPokedex, setOpenForm }) => {
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

  const handleAction = (e) => {
    e.preventDefault();
    const checked = Object.keys(region).filter((key) => region[key] === true);

    checked.forEach((key) => {
      const regionData = regions[key];
      const limit = regionData.higher - regionData.lower + 1;

      fetch(
        `https://pokeapi.co/api/v2/pokemon?offset=${
          regionData.lower - 1
        }&limit=${limit}`
      )
        .then((res) => res.json())
        .then((data) => {
          const result = data.results.reduce((acc, pokemon) => {
            acc[pokemon.name] = pokemon;
            return acc;
          }, {});

          setPokedex((prevState) => ({
            ...prevState,
            ...result,
          }));
        });
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
