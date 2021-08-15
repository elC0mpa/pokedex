<template>
  <div class="pokemon-details-card__description">
    <p class="pokemon-details-card__description--pokedex-entry">
      {{ pokemon.pokedex_entries[0].description }}
    </p>
  </div>
</template>

<script>
export default {
  name: "PokemonDescription",
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

<style lang="scss" scoped></style>
