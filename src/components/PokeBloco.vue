<script>
import axios from "axios";
export default {
  props: ["pokemonP"],
  data() {
    return {
      sprite: {},
      id: {},
      gen: {},
    };
  },
  created() {
    this.fetchFoto();
    this.fetchGen();
  },
  methods: {
    fetchFoto(url = "http://pokeapi.co/api/v2/pokemon/" + this.pokemonP) {
      axios
        .get(url)
        .then(({ data }) => (this.sprite = data.sprites)((this.id = data.id)));
    },
    fetchGen(
      url = "https://pokeapi.co/api/v2/pokemon-species/" + this.pokemonP
    ) {
      axios.get(url).then(({ data }) => (this.gen = data.generation.name));
    },
  },
};
</script>

<template>
  <button class="poke">
    <h3 class="nomeDoPoke">{{ id }}.{{ pokemonP }}</h3>
    <p>{{ gen }}</p>
    <img :src="sprite.front_default" />
  </button>
</template>
<style scoped>
button.poke {
  width: 150px;
  height: 150px;
  border-radius: 300px;
  margin: 5px;
  background: linear-gradient(180deg, red 50%, white 50%);
  color: rgb(0, 0, 0);
  font-size: 15px;
  transition: 0.1s;
  text-transform: capitalize;
  cursor: pointer;
  border: solid 3px black;
}

button.poke:hover {
  transform: scale(1.5);
  font-size: 10px;
  background: linear-gradient(180deg, red 30%, black 30%, white 30%);
  background-size: 400px 400px;
  border: solid 3px black;
  color: rgb(255, 255, 255);
  font-weight: 1000;
  z-index: 4;
  border-radius: 300px;
}

button.poke:active {
  transform: scale(1);
  background: linear-gradient(0deg, red 50%, white 50%);
  border: solid 3px black;
  color: rgb(255, 255, 255);
  font-weight: 1000;
  color: black;
}

img {
  width: 1px;
}

.poke:hover img {
  transform: scale(150);
}
</style>
