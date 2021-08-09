<template>
  <div class="pokemons-card-wrapper" :class="{ 'is-fetching': isFetching }">
    <pokemon-card
      @last-item-visible="fetchData"
      v-for="(pokemon, index) in pokemons || []"
      v-show="
        filteredPokemons.some((filteredPokemon) => {
          return pokemon.name === filteredPokemon.name;
        })
      "
      :key="index"
      :pokemon="pokemon"
      :last-item="lastItem"
    ></pokemon-card>
  </div>
</template>

<script>
import { reactive, toRefs, watch } from "@vue/runtime-core";
import { getPokemonList } from "../composables/api";
import PokemonCard from "../components/PokemonCard.vue";
export default {
  props: {
    typeFilters: {
      type: Array,
      required: true,
    },
  },
  components: {
    PokemonCard,
  },
  setup(props) {
    const state = reactive({
      pokemons: [],
      filteredPokemons: [],
      typeFilters: [],
      lastItem: {},
      isFetching: false,
    });

    //Fetch Pokemons features!!!!!!!!!!!!!!
    const options = {
      limit: 40,
      offset: 0,
    };
    const fetchData = () => {
      if (!state.isFetching) {
        state.isFetching = true;
        console.log("Fetch more data");
        getPokemonList(options)
          .then((data) => {
            console.log(options);
            state.pokemons = [...state.pokemons, ...data];
            state.lastItem = state.pokemons[state.pokemons.length - 1];
            state.filteredPokemons = [...state.pokemons];
            // typesFilterUpdated(state.typeFilters);
            options.offset = options.offset + 40;
            state.isFetching = false;
          })
          .catch((error) => {
            console.log(error);
          });
      }
    };
    fetchData();

    //Filter Pokemons features!!!!!!!!!!!!!!
    watch(
      () => props.typeFilters,
      (newVal) => {
        if (newVal.length === 0) {
          console.log("No type filters....\nRendering all pokemons");
          state.filteredPokemons = [...state.pokemons];
          state.lastItem = state.pokemons[state.pokemons.length - 1];
        } else {
          state.lastItem = {};
          state.filteredPokemons = state.pokemons.filter((pokemon) => {
            const hasType = pokemon.types.some((type) => {
              return newVal.includes(type.type.name);
            });
            return hasType;
          });
        }
      }
    );

    return {
      props,
      fetchData,
      ...toRefs(state),
    };
  },
};
</script>

<style lang="scss" scoped></style>
