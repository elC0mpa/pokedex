<template>
  <div>Pokemon Details View</div>
</template>

<script>
import { reactive, toRefs } from "@vue/runtime-core";
import { useRoute } from "vue-router";
import { getPokemonDetails } from "../composables/api";
export default {
  name: "PokemonDetails",
  setup() {
    const state = reactive({
      pokemon: {},
    });
    const route = useRoute();
    getPokemonDetails(route.params.id)
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.log(error);
      });
    return {
      ...toRefs(state),
    };
  },
};
</script>

<style lang="scss" scoped></style>
