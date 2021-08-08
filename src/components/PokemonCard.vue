<template>
  <div class="pokemon-card">
    <img
      class="pokemon-card__image"
      :alt="pokemon.name"
      :src="pokemon.sprites.front_default"
    />
    <div class="pokemon-card__name-types-container">
      <p class="pokemon-card__name">{{ pokemon.name }}</p>
      <div class="pokemon-card__types-container">
        <div
          v-for="(type, index) in pokemon.types"
          :key="index"
          class="pokemon-card__types-wrapper"
        >
          <img
            class="pokemon-card__type"
            :src="require(`../assets/icons/${type.type.name}.svg`)"
          />
        </div>
      </div>
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
