<template>
  <div class="home">
    <pokemon-card
      v-for="(pokemon, index) in pokemons"
      :key="index"
      :pokemon="pokemon"
    ></pokemon-card>
  </div>
</template>

<script>
// @ is an alias to /src
import { reactive, toRefs } from "@vue/reactivity";
import { getPokemonList } from "../composables/api";
import PokemonCard from "../components/PokemonCard.vue";
export default {
  name: "Home",
  components: {
    PokemonCard,
  },
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
