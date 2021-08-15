<template>
  <div class="pokemon-details-card">
    <div class="pokemon-details-card__title-container">
      <p class="pokemon-details-card__title-container--title">
        {{ pokemon.name }}
      </p>
    </div>
    <pokemon-sprite :pokemon="pokemon"></pokemon-sprite>
    <pokemon-description :pokemon="pokemon"></pokemon-description>
    <pokemon-general-info :pokemon="pokemon"></pokemon-general-info>
  </div>
</template>

<script>
import PokemonSprite from "./PokemonSprite.vue";
import PokemonDescription from "./PokemonDescription.vue";
import PokemonGeneralInfo from "./PokemonGeneralInfo.vue";
export default {
  components: {
    PokemonSprite,
    PokemonDescription,
    PokemonGeneralInfo,
  },
  props: {
    pokemon: {
      type: Object,
      required: true,
    },
  },
  setup(props) {
    return { props };
  },
};
</script>
