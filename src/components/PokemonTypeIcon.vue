<template>
  <div class="pokemon-type-icon__wrapper" :class="`is-${type}`">
    <img
      class="pokemon-type-icon__img"
      :src="require(`../assets/icons/${type}.svg`)"
    />
  </div>
</template>

<script>
export default {
  props: {
    type: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    return { props };
  },
};
</script>

<style lang="scss" scoped></style>
