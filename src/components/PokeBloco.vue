<script>
import axios from "axios";
export default {
  props: ["pokemonP"],
  data() {
    return {
      sprite: {},
    };
  },
  created() {
    this.fetchFoto();
  },
  methods: {
    fetchFoto(url = this.pokemonP.url) {
      axios.get(url).then(({ data }) => (this.sprite = data.sprites));
    },
  },
};
</script>

<template>
  <button class="poke">
    {{ pokemonP.name }}
    <img :src="sprite.front_default" />
  </button>
</template>
