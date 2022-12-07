<script>
import axios from "axios";
export default {
  //Informações importadas do PokemonComp
  props: ["img", "texto"],
  //Variáveis
  data() {
    return {
      esp_info: {},
      geracao: {},
      cor: {},
      shape: {},
      habitat: {},
      urlevo: {},
      linha_evo: {},
      evolui_null: {},
      evolui_de: {},
      egg_group: {},
      infoGen: {},
    };
  },
  computed: {
    //Obj que define a class do componente
    classObject: function () {
      return {
        lendario:
          this.esp_info.is_legendary == true &&
          this.esp_info.is_mythical == false,
        mitico:
          this.esp_info.is_legendary == false &&
          this.esp_info.is_mythical == true,
        normal:
          this.esp_info.is_legendary == false &&
          this.esp_info.is_mythical == false,
      };
    },
  },
  //Funções que são ativadas quando o site inicia
  created() {
    this.fetchEspInfo();
    this.fetchInfoGen();
    this.linhaEvo();
  },
  //Variáveis sendo observadas
  watch: {
    texto() {
      this.fetchEspInfo();
    },
    esp_info() {
      this.fetchInfoGen();
      this.linhaEvo();
    },
  },
  methods: {
    //Buscar geração e outras informações com base na espécie do pokémon
    fetchEspInfo(
      url = "https://pokeapi.co/api/v2/pokemon-species/" + this.texto
    ) {
      axios
        .get(url)
        .then(
          ({ data }) => (
            (this.esp_info = data),
            (this.geracao = data.generation),
            (this.cor = data.color.name),
            (this.shape = data.shape.name),
            (this.habitat = data.habitat.name),
            (this.evolui_null = data.evolves_from_species),
            (this.ovos = data.egg_groups),
            (this.urlevo = data.evolution_chain.url),
            (this.evolui_de = this.evolui_null.name)
          )
        );
    },
    //Buscar Informações da geração
    fetchInfoGen(url = this.geracao.url) {
      axios.get(url).then(({ data }) => (this.infoGen = data));
    },
    //Buscar info da linha evolutiva
    linhaEvo(url = this.urlevo) {
      axios.get(url).then(({ data }) => (this.linha_evo = data));
    },
  },
};
</script>
<template>
  <div class="tudo">
    <!-- Caixa de informações inferior -->
    <div id="informa2" v-bind:class="classObject">
      <h2>Shiny:</h2>
      <img class="shiny" :src="img.front_shiny" alt="Foto Indisponível" />
      <!-- Outras informações do pokémon -->
      <div class="bloco">
        <h2>Cor:</h2>
        <span class="info">{{ cor }}</span>
        <h2>Formato:</h2>
        <span class="info">{{ shape }}</span>
        <h2>Habitat:</h2>
        <span class="info">{{ habitat }}</span>
      </div>
      <div class="bloco">
        <h2>Taxa de captura:</h2>
        <span class="info">{{ esp_info.capture_rate }}</span>
      </div>
      <div class="bloco">
        <h2>Felicidade Base:</h2>
        <span class="info">{{ esp_info.base_happiness }}</span>
      </div>
      <div v-if="evolui_null != null" class="bloco">
        <h2>Evolui de:</h2>
        <span class="info">{{ evolui_de }}</span>
      </div>
      <div class="bloco">
        <h2>Grupo de ovos:</h2>
        <div v-for="(value, index) in ovos" :key="'value' + index">
          <span class="info">
            {{ value.name }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
@import "../assets/tipos.css";
@import "../assets/caixa.css";

.nomeDoPokemon {
  text-transform: capitalize;
}

div#informa2 {
  background-color: crimson;
  color: white;
  width: 53%;
  height: 35%;
  padding: 10px;
  margin: 2%;
  border-radius: 10px;
  border: solid 3px black;
  float: right;

  position: fixed;
  top: 53%;
  right: 1%;
  overflow-y: scroll;
}

/* .fotos:hover .normalers {
  display: none;
}

.fotos:hover .shiny {
  display: initial;
} */

.info {
  font-weight: 900;
  text-transform: capitalize;
}

h1 {
  font-weight: bolder;
  -webkit-text-stroke: 2px black;
}

div#informa img.normalers {
  width: 200px;
  height: auto;
  float: left;
}

div#informa2 img.shiny {
  width: 200px;
  height: auto;
  float: left;
}

.tipo {
  width: 100px;
  height: 100px;
}

.bloco {
  display: inline-block;
  max-height: 200px;
  width: 170px;
  margin: 5px;
  background-color: rgb(146, 19, 45);
  padding: 20px;
  border-radius: 5px;
  overflow-y: scroll;
}
</style>
