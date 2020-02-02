import React, { useState, useEffect } from "react";
import { UncontrolledTooltip } from "reactstrap";
import ReactDOM from "react-dom";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import ModalExample from "./modal/modal";

function App() {
  const [pokedex, setPokedex] = useState([]);
  const [wildPokemon, setWildPokemon] = useState({});
  useEffect(() => {
    encounterWildPokemon();
  }, []);
  const pokerId = () => {
    const min = Math.ceil(1);
    const max = Math.floor(151);
    return Math.floor(Math.random() * (max - min + 1) + 1);
  };
  const encounterWildPokemon = () => {
    axios
      .get("https://pokeapi.co/api/v2/pokemon/" + pokerId())
      .then(response => {
        setWildPokemon(response.data);
      });
  };
  const catchPokemon = pok => {
    if (
      !pokedex
        .map(e => {
          return e.name;
        })
        .includes(pok.name)
    ) {
      setPokedex([...pokedex, wildPokemon]);
    }
    encounterWildPokemon();
  };
  const removePokemon = id => {
    setPokedex(state => state.filter(p => p.id != id));
  };
  return (
    <div className="app-wrapper">
      <header>
        <h1 className="title"> Catching Pokemon </h1>
        <h3 className="subtitle">With React</h3>
      </header>
      <section className="wild-pokemon">
        <img
          src={
            "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/" +
            wildPokemon.id +
            ".png"
          }
          className="sprite"
        />
        <h3>{wildPokemon.name}</h3>
        {/* <button
          className="catch-btn"
          onClick={() => {
            catchPokemon(wildPokemon);
          }}
        >
        </button> */}
        <img
          onClick={() => {
            catchPokemon(wildPokemon);
          }}
          className="pokeball"
          src={require("./pokeball.png")}
        />
      </section>
      <section className="pokedex">
        <h2>POKEDÉX</h2>
        <br />
        <div className="pokedex-list">
          {pokedex.map(pokemon => (
            <div className="pokemon" key={pokemon.id}>
              <img
                src={
                  "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/" +
                  pokemon.id +
                  ".png"
                }
                className="sprite"
              />
              <ModalExample className="pokemon-modal" pokemon={pokemon} />
              <h4 className="pokemon-name">{pokemon.name}</h4>
              <button
                className="remove"
                onClick={() => {
                  removePokemon(pokemon.id);
                }}
              >
                &times;
              </button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));
