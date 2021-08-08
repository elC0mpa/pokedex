<template>
  <div class="pokemons-card-wrapper">
    <pokemon-card
      v-for="(pokemon, index) in pokemons"
      :key="index"
      :pokemon="pokemon"
    ></pokemon-card>
  </div>
</template>

<script>
import PokemonCard from "../components/PokemonCard.vue";
export default {
  props: {
    pokemons: {
      type: Array,
      required: true,
    },
  },
  components: {
    PokemonCard,
  },
  setup(props) {
    return {
      props,
    };
  },
};
</script>

<style lang="scss" scoped></style>
