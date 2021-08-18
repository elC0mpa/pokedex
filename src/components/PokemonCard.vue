<template>
  <div
    v-observe-visibility="isLastItem ? visibilityChanged : false"
    class="pokemon-card"
    @click="$emit('item-clicked', pokemon.id)"
  >
    <img
      class="pokemon-card__image"
      :alt="pokemon.name"
      :src="pokemon.sprites.front_default"
    />
    <div class="pokemon-card__name-types-container">
      <p class="pokemon-card__name">{{ pokemon.name }}</p>
      <div class="pokemon-card__types-container">
        <pokemon-type-icon
          v-for="(type, index) in pokemon.types"
          :key="index"
          :type="type.name.toLowerCase()"
        ></pokemon-type-icon>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive, toRefs } from "@vue/reactivity";
import PokemonTypeIcon from "./PokemonTypeIcon.vue";
import { computed } from "@vue/runtime-core";

export default {
  name: "PokemonCard",
  components: {
    PokemonTypeIcon,
  },
  props: {
    pokemon: {
      type: Object,
      required: true,
    },
    lastItem: {
      type: Object,
      required: true,
    },
  },
  setup(props, context) {
    const state = reactive({
      mouseOver: false,
    });
    const hover = (mouseOver) => {
      state.mouseOver = mouseOver;
    };
    const visibilityChanged = (isVisible) => {
      if (isVisible && props.pokemon.name === props.lastItem.name) {
        context.emit("last-item-visible");
      }
    };

    const isLastItem = computed(
      () => props.pokemon.name === props.lastItem.name
    );

    return {
      props,
      ...toRefs(state),
      hover,
      visibilityChanged,
      isLastItem,
    };
  },
};
</script>

<style lang="scss" scoped></style>
