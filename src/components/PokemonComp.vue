<script>
import axios from "axios";
import PokemonInfo from "../components/PokemonInfo.vue";
import PokeBloco from "./PokeBloco.vue";
import { useCounterStore } from "../stores/counter";
import { mapStores, mapActions, mapState } from "pinia";
export default {
  components: { PokemonInfo, PokeBloco },
  data() {
    return {
      api: {
        results: [],
      },
      urlP: "http://pokeapi.co/api/v2/pokemon/",
      poke: {},
      atual: "1",
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
  computed: {
    ...mapStores(useCounterStore),
    ...mapState(useCounterStore, ["count", "pesquisa", "tipo"]),
  },
  watch: {
    pesquisa() {
      if (this.tipo != 0) {
        const filter = this.api.results.filter((a) =>
          a.pokemon.name.includes(this.pesquisa)
        );
        if (filter.length === 1) {
          this.atual = filter[0].pokemon.name;
          this.mostrarInfo();
        }
      } else {
        const filter = this.api.results.filter((a) =>
          a.name.includes(this.pesquisa)
        );
        if (filter.length === 1) {
          this.atual = filter[0].name;
          this.mostrarInfo();
        }
      }
    },
    tipo() {
      this.fetchPokemons();
    },
  },
  methods: {
    ...mapActions(useCounterStore, ["increment", "pesquisarPoke", "mudarTipo"]),
    fetchPokemons(url = `http://pokeapi.co/api/v2/type/${this.tipo}`) {
      if (this.tipo != 0) {
        axios.get(url).then(({ data }) => (this.api.results = data.pokemon));
      } else {
        axios
          .get("https://pokeapi.co/api/v2/pokemon?limit=904&offset=0")
          .then(({ data }) => (this.api = data));
      }
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
  },
};
</script>
<template>
  <main>
    <div class="container">
      <h1 class="letraGrande">Lista de Pokémon: {{ pesquisa }} {{ tipo }}</h1>
      <ul class="lista-poke" v-if="tipo != 0">
        <li
          class="pokemao"
          v-for="indice in api.results.filter((a) =>
            a.pokemon.name.includes(pesquisa)
          )"
          :key="indice.pokemon.url"
        >
          <PokeBloco
            :pokemonP="indice.pokemon.name"
            @click="
              (atual = indice.pokemon.name),
                mostrarInfo((url = this.urlP + this.atual))
            "
          />
        </li>
      </ul>
      <ul class="lista-poke" v-else-if="tipo == 0">
        <li
          class="pokemao"
          v-for="pokemon in api.results.filter((a) =>
            a.name.includes(pesquisa)
          )"
          :key="pokemon.url"
        >
          <PokeBloco
            :pokemonP="pokemon.name"
            @click="
              (atual = pokemon.name),
                mostrarInfo((url = this.urlP + this.atual))
            "
          />
        </li>
      </ul>
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
    <h2>Este projeto foi feito por Paulo César & Gabriel Domingos</h2>
  </main>
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

.letraGrande {
  text-transform: capitalize;
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
