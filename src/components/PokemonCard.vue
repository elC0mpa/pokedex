<template>
  <div
    v-observe-visibility="isLastItem ? visibilityChanged : false"
    class="pokemon-card"
    @mouseover="hover(true)"
    @mouseleave="hover(false)"
  >
    <img
      class="pokemon-card__image"
      :alt="pokemon.name"
      :src="
        mouseOver === false
          ? pokemon.sprites.front_default
          : pokemon.sprites.front_shiny
      "
    />
    <div class="pokemon-card__name-types-container">
      <p class="pokemon-card__name">{{ pokemon.name }}</p>
      <div class="pokemon-card__types-container">
        <pokemon-type-icon
          v-for="(type, index) in pokemon.types"
          :key="index"
          :type="type.type.name"
        ></pokemon-type-icon>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive, toRefs } from "@vue/reactivity";
import PokemonTypeIcon from "../components/PokemonTypeIcon.vue";
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

    // watch(
    //   () => props.lastItem,
    //   (newVal) => {
    //     console.log("Pokemon Card detected a new lastItem: ", newVal);
    //   }
    // );

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
