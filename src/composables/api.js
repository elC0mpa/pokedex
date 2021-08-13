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
      resolve(
        results.filter(
          (type) => type.name !== "unknown" && type.name !== "shadow"
        )
      );
    } catch (error) {
      reject(error);
    }
  });
};

const getPokemonDetails = (id) => {
  // eslint-disable-next-line no-async-promise-executor
  return new Promise(async (resolve, reject) => {
    try {
      const pokemon = await P.getPokemonByName(id);
      const abilitiesPromises = pokemon.abilities.map((ability) => {
        return P.getAbilityByName(ability.ability.name).then((ability) => {
          return ability;
        });
      });
      pokemon.abilities = await Promise.all(abilitiesPromises);
      pokemon.species = await P.getPokemonSpeciesByName(pokemon.species.name);
      resolve(pokemon);
    } catch (error) {
      reject(error);
    }
  });
};

export { getPokemonList, getPokemonTypes, getPokemonDetails };
