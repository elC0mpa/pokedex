<template>
  <div class="home">
    <pokemons-card-wrapper :pokemons="pokemons"></pokemons-card-wrapper>
  </div>
</template>

<script>
// @ is an alias to /src
import { reactive, toRefs } from "@vue/reactivity";
import { getPokemonList } from "../composables/api";
import PokemonsCardWrapper from "../components/PokemonsCardWrapper.vue";
export default {
  name: "Home",
  components: {
    PokemonsCardWrapper,
  },
  setup() {
    const state = reactive({
      pokemons: [],
    });
    const options = {
      limit: 26,
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
