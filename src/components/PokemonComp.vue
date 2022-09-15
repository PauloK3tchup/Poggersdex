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
        .then(({ data }) => ((this.poke = data), (this.sprite = data.sprites)));
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

    <ul class="list-group">
      <li
        class="list-group-item"
        v-for="pokemon in api.results"
        :key="pokemon.url"
      >
        <button
          @click="
            (atual = pokemon.name), mostrarInfo((url = this.urlP + this.atual))
          "
        >
          {{ pokemon.name }}
        </button>
      </li>
    </ul>

    <button class="btn btn-primary" v-if="api.previous" @click="previous">
      Voltar
    </button>
    <button class="btn btn-primary" v-if="api.next" @click="next">
      Próximo
    </button>
  </div>
  <PokemonInfo
    :texto="poke.name"
    :id="poke.id"
    :habilidade="poke.abilities"
    :img="sprite.front_default"
  />
</template>
<style></style>
