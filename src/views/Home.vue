<template>
  <div class="home">
    <div v-for="(pokemon, index) in pokemons" :key="index">
      <img :alt="pokemon.name" :src="pokemon.sprites.front_default" />
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import { reactive, toRefs } from "@vue/reactivity";
import { getPokemonList } from "../composables/api";
export default {
  name: "Home",
  setup() {
    const state = reactive({
      pokemons: [],
    });
    const options = {
      limit: 25,
      offset: 0,
    };
    getPokemonList(options)
      .then((data) => {
        console.log(data);
        state.pokemons = data;
      })
      .catch((error) => {
        console.log(error);
      });
    return {
      ...toRefs(state),
    };
  },
};
</script>
