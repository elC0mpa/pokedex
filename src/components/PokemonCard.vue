<template>
  <div class="pokemon-card">
    <img
      class="pokemon-card__image"
      :alt="pokemon.name"
      :src="pokemon.sprites.front_default"
    />
    <div class="pokemon-card__name-types-container">
      <p class="pokemon-card__name">{{ pokemon.name }}</p>
      <!-- <img src="../" -->
    </div>
  </div>
</template>

<script>
export default {
  name: "PokemonCard",
  props: {
    pokemon: {
      type: Object,
      required: true,
    },
  },
  setup(props) {
    return {
      props,
    };
  },
};
</script>

<style lang="scss" scoped></style>
