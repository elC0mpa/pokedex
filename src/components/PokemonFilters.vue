<template>
  <div class="pokemon-filters">
    <h1>Filters</h1>
    <hr />
    <h2>Types</h2>
    <section class="pokemon-filters__types-section">
      <div
        class="pokemon-filters__type-container"
        :class="{ 'is-filtered': filters.includes(type.name) }"
        v-for="(type, index) in types || []"
        :key="index"
        @click="toggleTypeFilter(type.name)"
      >
        <pokemon-type-icon :type="type.name"></pokemon-type-icon>
        <p>{{ type.name }}</p>
      </div>
    </section>
  </div>
</template>

<script>
import { reactive, toRefs } from "@vue/reactivity";
import { getPokemonTypes } from "../composables/api";
import PokemonTypeIcon from "../components/PokemonTypeIcon.vue";
export default {
  name: "PokemonFilters",
  components: {
    PokemonTypeIcon,
  },
  setup(props, context) {
    const state = reactive({
      types: [],
      filters: [],
    });
    getPokemonTypes().then((data) => {
      state.types = data;
    });
    const toggleTypeFilter = (type) => {
      const typeFilteredIndex = state.filters.findIndex((filterType) => {
        return filterType === type;
      });
      if (typeFilteredIndex === -1) {
        state.filters.push(type);
      } else {
        state.filters.splice(typeFilteredIndex, 1);
      }
      context.emit("type-filter", state.filters);
    };
    return {
      ...toRefs(state),
      toggleTypeFilter,
    };
  },
};
</script>
