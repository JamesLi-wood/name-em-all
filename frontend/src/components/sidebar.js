import { useContext } from "react";
import { boardContext } from "../App";
import "./sidebar.css";

const Sidebar = () => {
  const { pokedex, setPokedex, setOpenForm } = useContext(boardContext);

  const view = () => {
    console.log(pokedex);
  };

  const reset = () => {
    setPokedex({
      regions: [],
    });
    setOpenForm(true);
  };

  const handleChange = (e) => {
    if (!pokedex[e.target.value] || e.target.value === "regions") return;

    // return if name is already locked in.

    fetch([pokedex[e.target.value].url])
      .then((res) => res.json())
      .then((data) => {
        const pokemonID = data.id;
        document.getElementById(
          `pokeID-${pokemonID}`
        ).style.backgroundImage = `url(${data.sprites.front_default})`;
      });

    e.target.value = "";
  };

  return (
    <div className="sidebar">
      <button onClick={reset}>Reset</button>
      <button onClick={view}>View Pokedex</button>
      <input type="text" placeholder="Search" onChange={handleChange} />
    </div>
  );
};

export default Sidebar;
