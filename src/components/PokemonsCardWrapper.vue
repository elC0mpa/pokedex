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
import { getPokemonsQuery } from "../composables/graphql-api";
import { useQuery } from "villus";
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

    const queryVars = reactive({
      allPokemonLimit: 40,
    });

    //Fetch Pokemons features!!!!!!!!!!!!!!
    const { execute: getPokemons } = useQuery({
      query: getPokemonsQuery,
      variables: queryVars,
    });

    const fetchData = () => {
      state.isFetching = true;
      getPokemons().then((data) => {
        console.log(data);
        if (data.error) {
          console.log(data.error);
        }
        state.pokemons = [...data.data.allPokemon];
        state.lastItem = state.pokemons[state.pokemons.length - 1];
        state.filteredPokemons = [...state.pokemons];
        // typesFilterUpdated(state.typeFilters);
        queryVars.allPokemonLimit += 40;
        state.isFetching = false;
      });
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
