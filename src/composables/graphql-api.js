import { useQuery } from "villus";

const getPokemonsQuery = `
query ($allPokemonLimit: Int) {
  allPokemon(limit: $allPokemonLimit) {
    name
    sprites {
      front_default
      front_shiny
    }
    types {
      name
    }
    id
  }
}
`;
const getPokemons = (limit) => {
  // eslint-disable-next-line no-async-promise-executor
  return new Promise(async (resolve, reject) => {
    const { execute } = useQuery({
      query: getPokemonsQuery,
      variables: { allPokemonLimit: limit },
    });

    const data = await execute();
    if (data.error) {
      reject(data.error);
    }
    resolve(data.data.allPokemon);
  });
};

export { getPokemons };
