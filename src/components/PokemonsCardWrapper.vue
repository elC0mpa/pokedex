<template>
  <div class="pokemons-card-wrapper">
    <pokemon-card
      @last-item-visible="lastItemVisible"
      v-for="(pokemon, index) in pokemons"
      :key="index"
      :pokemon="pokemon"
      :last-item="lastItem"
    ></pokemon-card>
  </div>
</template>

<script>
import { reactive, watch, toRefs } from "@vue/runtime-core";
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
  setup(props, context) {
    const state = reactive({
      lastItem: {},
    });
    const lastItemVisible = () => {
      context.emit("last-item-visible");
    };
    watch(props, () => {
      state.lastItem = props.pokemons[props.pokemons.length - 1];
      console.log("new lastItem in Wrapper: ", state.lastItem);
    });
    return {
      props,
      lastItemVisible,
      ...toRefs(state),
    };
  },
};
</script>

<style lang="scss" scoped></style>
