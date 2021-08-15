<template>
  <div v-if="!isFetching" class="pokemon-details-section">
    <pokemon-details-card :pokemon="pokemon"></pokemon-details-card>
    <div
      class="pokemon-details-section__icon-wrapper"
      :class="`is-${pokemon.types[0].name.toLowerCase()}`"
    >
      <img
        class="pokemon-details-section__icon-wrapper--icon"
        :src="
          require(`../assets/icons/${pokemon.types[0].name.toLowerCase()}.svg`)
        "
      />
    </div>
    <div
      class="pokemon-details-section__icon-wrapper"
      :class="`is-${pokemon.types[
        pokemon.types.length - 1
      ].name.toLowerCase()}`"
    >
      <img
        class="pokemon-details-section__icon-wrapper--icon"
        :src="
          require(`../assets/icons/${pokemon.types[
            pokemon.types.length - 1
          ].name.toLowerCase()}.svg`)
        "
      />
    </div>
  </div>
</template>

<script>
import { reactive, toRefs } from "@vue/runtime-core";
import { useRoute } from "vue-router";
import { useQuery } from "villus";
import PokemonDetailsCard from "../components/PokemonDetailsCard/index.vue";
import { getPokemonDetailsQuery } from "../composables/graphql-api";
export default {
  name: "PokemonDetails",
  components: {
    PokemonDetailsCard,
  },
  setup() {
    const state = reactive({
      pokemon: {},
    });
    const route = useRoute();

    // Fecth pokemon details feature!!!!!!!!!!!!!
    const { execute: getPokemonDetails, isFetching } = useQuery({
      query: getPokemonDetailsQuery,
      variables: {
        pokemonId: parseInt(route.params.id),
      },
    });

    getPokemonDetails().then((data) => {
      if (data.error) {
        console.log("Error: ", data.error);
        return;
      }
      state.pokemon = data.data.pokemon;
      console.log(state.pokemon);
    });

    //
    return {
      ...toRefs(state),
      isFetching,
    };
  },
};
</script>

<style lang="scss" scoped></style>
