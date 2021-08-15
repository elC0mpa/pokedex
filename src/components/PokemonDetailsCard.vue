<template>
  <div class="pokemon-details-card">
    <div class="pokemon-details-card__title-container">
      <p class="pokemon-details-card__title-container--title">
        {{ pokemon.name }}
      </p>
    </div>
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
    <div class="pokemon-details-card__description">
      <p class="pokemon-details-card__description--pokedex-entry">
        {{ pokemon.pokedex_entries[0].description }}
      </p>
    </div>
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
  </div>
</template>

<script>
import PokemonTypeIcon from "../components/PokemonTypeIcon.vue";
export default {
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
