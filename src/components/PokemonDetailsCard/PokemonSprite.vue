<template>
  <div class="pokemon-details-card__sprite-types-genus-container">
    <div
      class="pokemon-details-card__sprite-types-genus-container--sprite-types"
    >
      <img
        class="pokemon-details-card__sprite-types-container--sprite"
        :alt="pokemon.name"
        :src="pokemon.sprites.front_default"
      />
      <div class="pokemon-details-card__sprite-types-container--types">
        <pokemon-type-icon
          v-for="(type, index) in pokemon.types"
          :key="index"
          :type="type.name.toLowerCase()"
        ></pokemon-type-icon>
      </div>
    </div>
    <p class="pokemon-details-card__sprite-types-genus-container--genus">
      {{ pokemon.genus }}
    </p>
  </div>
</template>

<script>
import PokemonTypeIcon from "../PokemonTypeIcon.vue";
export default {
  name: "PokemonSprite",
  components: {
    PokemonTypeIcon,
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
