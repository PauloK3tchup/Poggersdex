<script>
import axios from "axios";
import PokemonInfo from "../components/PokemonInfo.vue";

export default {
  components: { PokemonInfo },
  data() {
    return {
      api: {},
      atual: "bulbasaur",
      pesquisa: "",
      urlP: "http://pokeapi.co/api/v2/pokemon/",
      urlImg:
        "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/",
      poke: {},
      sprite: {},
      tipos: {},
      habilidades: {},
      formas: {},
      stats: {},
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
            (this.habilidades = data.abilities),
            (this.formas = data.forms),
            (this.stats = data.stats)
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
    <ul class="lista-poke">
      <li class="pokemao" v-for="pokemon in api.results" :key="pokemon.url">
        <button
          class="poke"
          @click="
            (atual = pokemon.name), mostrarInfo((url = this.urlP + this.atual))
          "
        >
          {{ pokemon.name }}
          <img :src="urlImg + pokemon.index + '.png'" alt="Sexo" />
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
    :formas="formas"
    :tamanho="poke.height"
    :stats="stats"
  />
</template>
<style>
ul li.pokemao {
  display: inline-block;
}

button.poke {
  width: 115px;
  height: 115px;
  border-radius: 12px;
  margin: 5px;
  background-color: #20e8a9;
  color: rgb(0, 0, 0);
  font-size: 15px;
  transition: 0.1s;
  text-transform: capitalize;
  cursor: pointer;
  border: solid 1px black;
}

div.container {
  display: inline-block;
  margin-top: 6%;
  width: 45%;
}

button.poke:hover {
  transform: scale(1.3);
  background: linear-gradient(180deg, red 50%, white 50%);
  border: solid 3px black;
  color: rgb(255, 255, 255);
  font-weight: 1000;
  -webkit-text-stroke: 1px rgb(0, 0, 0);
  z-index: 4;
}

button.poke:active {
  transform: scale(1);
  background: linear-gradient(0deg, red 50%, white 50%);
  border: solid 3px black;
  color: rgb(255, 255, 255);
  font-weight: 1000;
  -webkit-text-stroke: 1px rgb(0, 0, 0);
}

.pesquisarInput {
  height: 40px;
  padding: 5px;
  border-radius: 10px;
  border: solid 2px black;
}

.pesquisarInput:hover {
  background-color: antiquewhite;
}

.pesquisarInput:active {
  border: solid 3px black;
}

button.pesquisarBotao {
  width: auto;
  height: 50px;
  border-radius: 12px;
  margin: 5px;
  font-size: 15px;
  transition: 0.1s;
  text-transform: capitalize;
  cursor: pointer;
  border: solid 1px black;
  background: linear-gradient(
    180deg,
    rgb(255, 187, 0) 50%,
    rgb(26, 26, 26) 50%
  );
  color: rgb(255, 255, 255);
  font-weight: 1000;
  -webkit-text-stroke: 1px rgb(0, 0, 0);
}

button.pesquisarBotao:hover {
  transform: scale(1.3);
}

button.pesquisarBotao:active {
  transform: scale(1);
  background: linear-gradient(0deg, rgb(255, 187, 0) 50%, rgb(26, 26, 26) 50%);
}
</style>
