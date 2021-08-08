<template>
  <div class="home">
    <pokemons-card-wrapper
      @last-item-visible="fetchData"
      :pokemons="pokemons"
    ></pokemons-card-wrapper>
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
      loading: false,
    });
    const options = {
      limit: 40,
      offset: 0,
    };
    const fetchData = () => {
      if (!state.loading) {
        state.loading = true;
        console.log("Fetch more data");
        getPokemonList(options)
          .then((data) => {
            console.log(options);
            state.pokemons = [...state.pokemons, ...data];
            state.loading = false;
            options.offset = options.offset + 40;
          })
          .catch((error) => {
            console.log(error);
          });
      }
    };
    fetchData();
    return {
      ...toRefs(state),
      fetchData,
    };
  },
};
</script>
