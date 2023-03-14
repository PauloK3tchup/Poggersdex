<script>
//Coisas importadas de fora
import axios from "axios";
import PokemonInfo from "../components/PokemonInfo.vue";
import PokemonInfo2 from "../components/PokemonInfo2.vue";
import PokeBloco from "./PokeBloco.vue";
import { useCounterStore } from "../stores/counter";
import { mapStores, mapActions, mapState } from "pinia";

export default {
  components: { PokemonInfo, PokemonInfo2, PokeBloco },
  //Variáveis
  data() {
    return {
      api: {
        results: [],
      },
      urlP: "https://pokeapi.co/api/v2/pokemon/",
      poke: {},
      atual: "1",
      sprite: {},
      tipos: {},
      habilidades: {},
      formas: {},
      stats: {},
      loading: true,
    };
  },
  //Funções que começam sendo executadas
  created() {
    this.fetchPokemon();
    this.mostrarInfo();
  },
  //Pinia
  computed: {
    ...mapStores(useCounterStore),
    ...mapState(useCounterStore, ["count", "pesquisa", "tipo", "filtro"]),
  },
  //Variáveis monitoradas
  watch: {
    pesquisa() {
      //Pesquisa quando tem 1 tipo selecionado
      if (this.tipo != 0) {
        const filter = this.api.results.filter((a) =>
          a.pokemon.name.includes(this.pesquisa)
        );
        if (filter.length === 1) {
          this.atual = filter[0].pokemon.name;
          this.mostrarInfo();
        }
        //Pesquisa quando nenhum tipo está selecionado
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
    //Tipo selecionado
    tipo() {
      this.fetchPokemon();
    },
    //Filtro selecionado
    filtro() {
      this.fetchPokemon();
    },
  },
  //Funções
  methods: {
    //Pinia
    ...mapActions(useCounterStore, ["increment", "pesquisarPoke", "mudarTipo"]),
    //Buscar pokémon com 1 tipo selecionado
    async fetchPokemon(url = `https://pokeapi.co/api/v2/type/${this.tipo}`) {
      this.loading = true;
      if (this.tipo != 0) {
        await axios
          .get(url)
          .then(
            ({ data }) => (
              (this.api.results = data.pokemon), (this.loading = false)
            )
          );
      } else {
        if (this.filtro != "") {
          //Buscar os pokémon com filtro
          axios
            .get("https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0")
            .then(({ data }) => ((this.api = data), (this.loading = false)));
        } else {
          //Buscar todos os pokémon
          axios
            .get(
              "https://pokeapi.co/api/v2/pokemon-species?limit=100000&offset=0"
            )
            .then(({ data }) => ((this.api = data), (this.loading = false)));
        }
      }
    },
    //Buscar informações do pokémon selecionado
    async mostrarInfo(url = this.urlP + this.atual) {
      await axios
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
      <h1 class="letraGrande">Lista de Pokémon: {{ pesquisa }}</h1>
      <!-- Lista de pokémon com 1 tipo selecionado -->
      <h2 v-if="loading == true">Carregando...</h2>
      <ul class="lista-poke" v-if="tipo != 0 && loading == false">
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
      <!-- Lista de pokémon com nenhum tipo selecionado -->
      <ul class="lista-poke" v-else-if="tipo == 0 && loading == false">
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
    <!-- Informações do pokémon sendo exportadas para o componente A -->
    <PokemonInfo
      :texto="poke.name"
      :id="poke.id"
      :habilidade="habilidades"
      :img="sprite"
      :tipo="tipos"
      :formas="formas"
      :tamanho="poke.height"
      :stats="stats"
    />
    <!-- Informações do pokémon sendo exportadas para o componente B -->
    <PokemonInfo2 :texto="poke.name" :img="sprite" />
  </main>
</template>
<style>
ul li.pokemao {
  display: inline-block;
}

div.container {
  display: inline-block;
  margin-top: 6%;
  margin-bottom: 6%;
  width: 45%;
}

.letraGrande {
  text-transform: capitalize;
}
</style>
