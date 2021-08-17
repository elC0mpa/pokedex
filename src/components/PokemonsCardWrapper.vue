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
      :is-fetching="isFetching"
    ></pokemon-card>
    <content-loader
      :width="220"
      :height="150"
      :speed="2"
      primaryColor="#f3f3f3"
      secondaryColor="#ecebeb"
      v-for="index in 60"
      :key="index"
      v-show="isFetching && pokemons.length === 0"
    >
      <circle cx="136" cy="62" r="48" />
    </content-loader>
  </div>
</template>

<script>
import { reactive, toRefs, watch } from "@vue/runtime-core";
import { ContentLoader } from "vue-content-loader";
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
    ContentLoader,
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
    const queryVars = reactive({
      allPokemonLimit: 40,
    });

    const { execute: getPokemons, isFetching } = useQuery({
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
        setTimeout(() => {
          state.isFetching = false;
        }, 5500);
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
              return newVal.includes(type.name.toLowerCase());
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
      isFetching,
    };
  },
};
</script>

<style lang="scss" scoped></style>
