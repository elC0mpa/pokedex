<template>
  <div class="pokemon-details-card">
    <div class="pokemon-details-card__title-container">
      <p
        class="pokemon-details-card__title-container--title"
        :style="titleGradient"
      >
        {{ pokemon.name }}
      </p>
    </div>
    <pokemon-sprite :pokemon="pokemon"></pokemon-sprite>
    <pokemon-description :pokemon="pokemon"></pokemon-description>
    <pokemon-general-info :pokemon="pokemon"></pokemon-general-info>
    <pokemon-base-stats :pokemon="pokemon"></pokemon-base-stats>
  </div>
</template>

<script>
import PokemonSprite from "./PokemonSprite.vue";
import PokemonDescription from "./PokemonDescription.vue";
import PokemonGeneralInfo from "./PokemonGeneralInfo.vue";
import PokemonBaseStats from "./PokemonBaseStats.vue";
import { getColorFromType } from "../../composables/utils";
import { computed } from "vue";
export default {
  components: {
    PokemonSprite,
    PokemonDescription,
    PokemonGeneralInfo,
    PokemonBaseStats,
  },
  props: {
    pokemon: {
      type: Object,
      required: true,
    },
  },
  setup(props) {
    const titleGradient = computed(() => {
      let firstColor = getColorFromType(props.pokemon.types[0].name);
      let secondColor = getColorFromType(
        props.pokemon.types[props.pokemon.types.length - 1].name
      );
      return `background-image: linear-gradient(to right, ${firstColor}, ${secondColor});`;
    });
    return { props, titleGradient };
  },
};
</script>
