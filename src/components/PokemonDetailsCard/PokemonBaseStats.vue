<template>
  <div class="pokemon-details-card__base-stats">
    <p class="pokemon-details-card__base-stats--title">Base stats</p>
    <div class="pokemon-details-card__base-stats--container">
      <ve-progress
        :size="100"
        :progress="hpProgress"
        thickness="5%"
        line-mode="center"
        color="#777"
        color-fill="transparent"
        :legend-formatter="hpFormatter"
        animation="default 1000 0"
      ></ve-progress>
      <ve-progress
        :size="100"
        :progress="attackProgress"
        thickness="5%"
        line-mode="center"
        color="#777"
        color-fill="transparent"
        :legend-formatter="attackFormatter"
        animation="default 1000 500"
      ></ve-progress>
      <ve-progress
        :size="100"
        :progress="defenseProgress"
        thickness="5%"
        line-mode="center"
        color="#777"
        color-fill="transparent"
        :legend-formatter="defenseFormatter"
        animation="default 1000 1000"
      ></ve-progress>
      <ve-progress
        :size="100"
        :progress="speedProgress"
        thickness="5%"
        line-mode="center"
        color="#777"
        color-fill="transparent"
        :legend-formatter="speedFormatter"
        animation="default 1000 1500"
      ></ve-progress>
      <ve-progress
        :size="100"
        :progress="specialAttackProgress"
        thickness="5%"
        line-mode="center"
        color="#777"
        color-fill="transparent"
        :legend-formatter="spAttackFormatter"
        animation="default 1000 2000"
      ></ve-progress>
      <ve-progress
        :size="100"
        :progress="specialDefenseprogress"
        thickness="5%"
        line-mode="center"
        color="#777"
        color-fill="transparent"
        :legend-formatter="spDefenseFormatter"
        animation="default 1000 2500"
      ></ve-progress>
    </div>
  </div>
</template>

<script>
import { reactive, toRefs } from "@vue/reactivity";
export default {
  name: "PokemonBaseStats",
  props: {
    pokemon: {
      type: Object,
      required: true,
    },
  },
  setup(props) {
    const state = reactive({
      hpProgress: 0,
      attackProgress: 0,
      defenseProgress: 0,
      specialAttackProgress: 0,
      specialDefenseprogress: 0,
      speedProgress: 0,
    });

    const maxBaseStats = {
      hp: 255,
      attack: 190,
      defense: 250,
      specialAttack: 194,
      specialDefense: 250,
      speed: 200,
    };

    // Formatters section
    const hpFormatter = () => {
      return `<p style="margin: 0">HP</p>${props.pokemon.base_stats.hp}/${maxBaseStats.hp}`;
    };
    const attackFormatter = () => {
      return `<p style="margin: 0">Attack</p>${props.pokemon.base_stats.attack}/${maxBaseStats.attack}`;
    };
    const defenseFormatter = () => {
      return `<p style="margin: 0">Defense</p>${props.pokemon.base_stats.defense}/${maxBaseStats.defense}`;
    };
    const spAttackFormatter = () => {
      return `<p style="margin: 0">Special</p> <p style="margin: 0">Attack</p>${props.pokemon.base_stats.special_attack}/${maxBaseStats.specialAttack}`;
    };
    const spDefenseFormatter = () => {
      return `<p style="margin: 0">Special</p> <p style="margin: 0">Defense</p>${props.pokemon.base_stats.special_defense}/${maxBaseStats.specialDefense}`;
    };
    const speedFormatter = () => {
      return `<p style="margin: 0">Speed</p>${props.pokemon.base_stats.speed}/${maxBaseStats.speed}`;
    };

    // Porgress section
    state.hpProgress = (props.pokemon.base_stats.hp / maxBaseStats.hp) * 100;
    state.attackProgress =
      (props.pokemon.base_stats.attack / maxBaseStats.attack) * 100;
    state.defenseProgress =
      (props.pokemon.base_stats.defense / maxBaseStats.defense) * 100;
    state.speedProgress =
      (props.pokemon.base_stats.speed / maxBaseStats.speed) * 100;
    state.specialAttackProgress =
      (props.pokemon.base_stats.special_attack / maxBaseStats.specialAttack) *
      100;
    state.specialDefenseprogress =
      (props.pokemon.base_stats.special_defense / maxBaseStats.specialDefense) *
      100;
    return {
      props,
      ...toRefs(state),
      hpFormatter,
      attackFormatter,
      defenseFormatter,
      spAttackFormatter,
      spDefenseFormatter,
      speedFormatter,
    };
  },
};
</script>

<style lang="scss" scoped></style>
