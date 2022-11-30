<script>
import axios from "axios";
export default {
  props: [
    "habilidade",
    "img",
    "texto",
    "id",
    "tipo",
    "formas",
    "tamanho",
    "stats",
  ],
  data() {
    return {
      esp_info: {},
      forma_info: {},
      geracao: {},
      infoGen: {},
    };
  },
  computed: {
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
  created() {
    this.fetchEspInfo();
    this.mudarAlguns();
    this.fetchFormaInfo();
  },
  watch: {
    texto() {
      this.fetchEspInfo();
      this.fetchFormaInfo();
    },
    esp_info() {
      this.mudarAlguns();
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
            (this.esp_info = data), (this.geracao = data.generation)
          )
        );
    },
    fetchFormaInfo(
      url = "https://pokeapi.co/api/v2/pokemon-form/" + this.texto
    ) {
      axios.get(url).then(({ data }) => (this.forma_info = data));
    },
    mudarAlguns(url = this.geracao.url) {
      axios.get(url).then(({ data }) => (this.infoGen = data));
    },
  },
};
</script>
<template>
  <div class="tudo">
    <!-- Caixa de informações superior -->
    <div id="informa" v-bind:class="classObject">
      <!--Nome do pokémon-->
      <h1 class="nomeDoPokemon">{{ texto }}</h1>
      <span
        v-if="esp_info.is_legendary == true"
        id="tipoTexto"
        class="tipo_lendario"
        >Lendário</span
      >
      <span v-if="texto == 'amoonguss'" id="tipoTexto" class="tipo_lendario"
        >Sus</span
      >
      <span
        v-if="esp_info.is_mythical == true"
        id="tipoTexto"
        class="tipo_mitico"
        >Mítico</span
      >
      <span
        v-if="forma_info.is_mega == true"
        id="tipoTexto"
        class="tipo_megaevo"
        >MegaEvolução</span
      >
      <!--ID do pokémon-->
      <p>{{ id }}</p>
      <!-- Geração do pokémon -->
      <p>{{ infoGen.id }}ª Geração</p>
      <!-- Tipos do pokémon -->
      <div class="tipo">
        <h2>Tipos:</h2>
        <div v-for="(value, index) in tipo" :key="'value' + index">
          <span id="tipoTexto" :class="value.type.name">
            {{ value.type.name }}
          </span>
        </div>
      </div>
      <!-- Sprites do pokémon -->
      <div class="fotos">
        <img
          class="normalers"
          :src="img.front_default"
          alt="Foto Indisponível"
        />
      </div>
      <!-- Informações principais do pokémon -->
      <div class="bloco">
        <h2>Estatísticas:</h2>
        <div v-for="(value, index) in stats" :key="'value' + index">
          <span class="info">
            {{ value.stat.name }}:
            {{ value.base_stat }}
          </span>
        </div>
      </div>
      <div class="bloco">
        <h2>Habilidades:</h2>
        <div v-for="(value, index) in habilidade" :key="'value' + index">
          <span class="info">
            {{ value.ability.name }}
          </span>
        </div>
      </div>
      <div class="bloco">
        <h2>Formas:</h2>
        <div v-for="(value, index) in formas" :key="'value' + index">
          <span class="info">
            {{ value.name }}
          </span>
        </div>
      </div>
      <div class="bloco">
        <h2>Tamanho:</h2>
        <span class="info"> {{ tamanho / 10 }}m </span>
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

div#informa {
  background-color: crimson;
  color: white;
  width: 53%;
  height: 45%;
  padding: 10px;
  margin: 2%;
  border-radius: 10px;
  border: solid 3px black;
  float: right;

  position: fixed;
  top: 7%;
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
