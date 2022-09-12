<template>
  <div class="container">
    <h1>Pokedex</h1>

    <ul class="list-group">
      <li
        class="list-group-item"
        v-for="pokemon in api.results"
        :key="pokemon.id"
        v-text="pokemon.name"
      ></li>
    </ul>

    <button class="btn btn-primary" v-if="api.previous" @click="previous">
      Voltar
    </button>
    <button class="btn btn-primary" v-if="api.next" @click="next">
      Próximo
    </button>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      api: {},
    };
  },

  created() {
    this.fetchPokemons();
  },

  methods: {
    fetchPokemons(url = "http://pokeapi.co/api/v2/pokemon") {
      axios.get(url).then(({ data }) => (this.api = data));
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
