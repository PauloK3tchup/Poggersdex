<script>
import axios from "axios";
import PokemonInfo from "../components/PokemonInfo.vue";

export default {
  components: { PokemonInfo },
  data() {
    return {
      api: {},
      atual: "Pokemon não selecionado",
      pokemon_atual: [
        {
          nome: "Pokémon não selecionado",
          indice: "",
          tipo: "",
          sprite: "",
        },
      ],
    };
  },
  created() {
    this.fetchPokemons();
  },
  methods: {
    fetchPokemons(url = "http://pokeapi.co/api/v2/pokemon/?offset=0&limit=70") {
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
<template>
  <div class="container">
    <h1>Pokedex</h1>

    <ul class="list-group">
      <li
        class="list-group-item"
        v-for="pokemon in api.results"
        :key="pokemon.url"
      >
        <a @click.prevent="(atual = pokemon.name), select" href="">
          {{ pokemon.name }}
        </a>
      </li>
    </ul>

    <button class="btn btn-primary" v-if="api.previous" @click="previous">
      Voltar
    </button>
    <button class="btn btn-primary" v-if="api.next" @click="next">
      Próximo
    </button>
  </div>
  <ul>
    <li v-for="info in pokemon_atual" :key="info.nome">{{ info.nome }}</li>
  </ul>
  <PokemonInfo :texto="pokemon_atual" />
</template>
<style></style>
