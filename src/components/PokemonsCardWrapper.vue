<template>
  <div class="pokemons-card-wrapper" :class="{ 'is-fetching': isFetching }">
    <pokemon-card
      @last-item-visible="fetchData"
      @item-clicked="showPokemonDetails"
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
    <vue-final-modal v-model="showDetails">
      <pokemon-details-card
        v-if="selectedPokemon"
        :pokemon="selectedPokemon"
      ></pokemon-details-card>
    </vue-final-modal>
  </div>
</template>

<script>
import { reactive, toRefs, watch } from "@vue/runtime-core";
import { ContentLoader } from "vue-content-loader";
import { getPokemonsQuery } from "../composables/graphql-api";
import { getPokemonDetailsQuery } from "../composables/graphql-api";
import { useQuery } from "villus";
import PokemonCard from "../components/PokemonCard.vue";
import PokemonDetailsCard from "../components/PokemonDetailsCard/index.vue";
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
    PokemonDetailsCard,
  },
  setup(props) {
    const state = reactive({
      pokemons: [],
      filteredPokemons: [],
      typeFilters: [],
      lastItem: {},
      isFetching: false,
      showDetails: false,
      selectedPokemon: null,
    });

    //Fetch Pokemons features!!!!!!!!!!!!!!
    const getPokemonsQueryVars = reactive({
      allPokemonLimit: 40,
    });

    const { execute: getPokemons, isFetching } = useQuery({
      query: getPokemonsQuery,
      variables: getPokemonsQueryVars,
    });

    const fetchData = () => {
      state.isFetching = true;
      getPokemons().then((data) => {
        console.log(data);
        if (data.error) {
          console.log(data.error);
          return;
        }
        state.pokemons = [...data.data.allPokemon];
        state.lastItem = state.pokemons[state.pokemons.length - 1];
        state.filteredPokemons = [...state.pokemons];
        // typesFilterUpdated(state.typeFilters);
        getPokemonsQueryVars.allPokemonLimit += 40;
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

    //PokemonDetails Features
    const getPokemonDetailsVars = reactive({
      pokemonId: null,
    });

    const showPokemonDetails = (id) => {
      getPokemonDetailsVars.pokemonId = id;
      getPokemonDetails().then((data) => {
        if (data.error) {
          console.log(data.error);
          return;
        }
        state.selectedPokemon = data.data.pokemon;
        state.showDetails = true;
        console.log(state.selectedPokemon);
      });
    };

    const { execute: getPokemonDetails } = useQuery({
      query: getPokemonDetailsQuery,
      variables: getPokemonDetailsVars,
    });

    return {
      props,
      fetchData,
      ...toRefs(state),
      isFetching,
      showPokemonDetails,
    };
  },
};
</script>

<style lang="scss" scoped></style>
