import Pokedex from "pokedex-promise-v2";
const P = new Pokedex();

const getPokemonList = (options) => {
  // eslint-disable-next-line no-async-promise-executor
  return new Promise(async (resolve, reject) => {
    try {
      const { results } = await P.getPokemonsList(options);
      const pokemonsURL = results.map((pokemon) => {
        return pokemon.url;
      });
      const data = await P.resource(pokemonsURL);
      resolve(data);
    } catch (error) {
      reject(error);
    }
  });
};

const getPokemonTypes = () => {
  // eslint-disable-next-line no-async-promise-executor
  return new Promise(async (resolve, reject) => {
    try {
      const { results } = await P.getTypesList();
      resolve(results);
    } catch (error) {
      reject(error);
    }
  });
};

export { getPokemonList, getPokemonTypes };
