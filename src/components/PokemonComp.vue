<script>
import axios from "axios";
import PokemonInfo from "../components/PokemonInfo.vue";

export default {
  components: { PokemonInfo },
  data() {
    return {
      api: {},
      atual: "bulbasaur",
      urlP: "http://pokeapi.co/api/v2/pokemon/",
      poke: {},
      sprite: {},
      tipos: {},
      habilidades: {},
    };
  },
  created() {
    this.fetchPokemons();
    this.mostrarInfo();
  },
  methods: {
    fetchPokemons(url = "http://pokeapi.co/api/v2/pokemon/?offset=0&limit=70") {
      axios.get(url).then(({ data }) => (this.api = data));
    },
    mostrarInfo(url = this.urlP + this.atual) {
      axios
        .get(url)
        .then(
          ({ data }) => (
            (this.poke = data),
            (this.sprite = data.sprites),
            (this.tipos = data.types),
            (this.habilidades = data.abilities)
          )
        );
    },
    next() {
      this.fetchPokemons(this.api.next);
    },
    previous() {
      this.fetchPokemons(this.api.previous);
    },
  },
};
</script>
<template>
  <div class="container">
    <h1>Pokedex</h1>

    <ul class="">
      <li class="" v-for="pokemon in api.results" :key="pokemon.url">
        <button
          class="poke"
          @click="
            (atual = pokemon.name), mostrarInfo((url = this.urlP + this.atual))
          "
        >
          {{ pokemon.name }}
        </button>
      </li>
    </ul>

    <button class="" v-if="api.previous" @click="previous">Voltar</button>
    <button class="" v-if="api.next" @click="next">Próximo</button>
  </div>
  <PokemonInfo
    :texto="poke.name"
    :id="poke.id"
    :habilidade="habilidades"
    :img="sprite.front_default"
    :tipo="tipos"
  />
</template>
<style>
button.poke {
  width: auto;
  height: 50px;
  border-radius: 12px;
  margin: 5px;
  background-color: #20e8a9;
  color: rgb(0, 0, 0);
  font-size: 15px;
  transition: 0.1s;
  text-transform: capitalize;
  cursor: pointer;
}

div.container {
  display: inline-block;
}

button.poke:hover {
  transform: scale(1.3);
  background: linear-gradient(180deg, red 50%, white 50%);
  border: solid 3px black;
  color: rgb(255, 255, 255);
  font-weight: 1000;
  -webkit-text-stroke: 1px rgb(0, 0, 0);
}
</style>
