<template>
  <div class="pokemon-details-card__general-info">
    <p class="pokemon-details-card__general-info--title">General info</p>
    <div class="pokemon-details-card__general-info--weight-height">
      <p>Weight: {{ pokemon.weight / 100 }} kg</p>
      <p>Height: {{ pokemon.height / 100 }} m</p>
    </div>
    <div class="pokemon-details-card__general-info--abilities">
      <p class="pokemon-details-card__general-info--abilities__title">
        Abilities
      </p>
      <div>
        <div
          class="pokemon-details-card__general-info--abilities__wrapper"
          v-for="(ability, index) in pokemon.abilities"
          :key="index"
        >
          <p>{{ ability.name }}:</p>
          <p>{{ ability.description }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "pokemonGeneralInfo",
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
