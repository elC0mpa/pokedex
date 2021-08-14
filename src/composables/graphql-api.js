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

export { getPokemonsQuery };
