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

const getPokemonDetailsQuery = `
query Query($pokemonId: Int!) {
  pokemon(id: $pokemonId) {
    name
    genus
    types {
      name
    }
    sprites {
      front_default
    }
    evolves_to {
      name
      sprites {
        front_default
      }
    }
    evolves_from {
      name
      sprites {
        front_default
      }
    }
    weight
    height
    abilities {
      name
      description
    }
    base_stats {
      attack 
      defense
      hp
      special_attack
      special_defense
      speed
    }
    pokedex_entries {
      description
    }
  }
}
`;

export { getPokemonsQuery, getPokemonDetailsQuery };
