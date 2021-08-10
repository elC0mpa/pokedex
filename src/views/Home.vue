<template>
  <main class="main-section">
    <h1 class="main-header">PokeVue</h1>
    <pokemon-filters @type-filter="typesFilterUpdated"></pokemon-filters>
    <pokemons-card-wrapper :type-filters="typeFilters"></pokemons-card-wrapper>
  </main>
</template>

<script>
// @ is an alias to /src
import { reactive, toRefs } from "@vue/reactivity";
import PokemonsCardWrapper from "../components/PokemonsCardWrapper.vue";
import PokemonFilters from "../components/PokemonFilters.vue";
export default {
  name: "Home",
  components: {
    PokemonsCardWrapper,
    PokemonFilters,
  },
  setup() {
    const state = reactive({
      typeFilters: [],
    });
    const typesFilterUpdated = (types) => {
      state.typeFilters = [...types];
    };
    return {
      ...toRefs(state),
      typesFilterUpdated,
    };
  },
};
</script>
