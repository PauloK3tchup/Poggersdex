<script>
import axios from "axios";
export default {
  props: ["pokemonP"],
  data() {
    return {
      sprite: {},
      id: {},
    };
  },
  created() {
    this.fetchFoto();
  },
  methods: {
    fetchFoto(url = this.pokemonP.url) {
      axios
        .get(url)
        .then(({ data }) => (this.sprite = data.sprites)((this.id = data.id)));
    },
  },
};
</script>

<template>
  <button class="poke">
    <p>{{ id }}.{{ pokemonP.name }}</p>
    <img :src="sprite.front_default" />
  </button>
</template>
