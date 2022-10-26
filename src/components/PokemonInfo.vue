<script>
import axios from "axios";
export default {
  data() {
    return { evo1: {} };
  },
  props: [
    "habilidade",
    "img",
    "texto",
    "id",
    "tipo",
    "formas",
    "tamanho",
    "stats",
    "geração",
    "rate",
    "evolucoes",
  ],
  created() {},
  watch: {},
  methods: {},
};
</script>
<template>
  <div class="tudo">
    <div class="informa">
      <h1 class="nomeDoPokemon">{{ texto }}</h1>
      <p>{{ id }}</p>
      <p>{{ geração }}</p>
      <div class="tipo">
        <h2>Tipos:</h2>
        <div v-for="(value, index) in tipo" :key="'value' + index">
          <span id="tipoTexto" :class="value.type.name">
            {{ value.type.name }}
          </span>
        </div>
      </div>
      <div class="fotos">
        <img
          class="normalers"
          :src="img.front_default"
          alt="Foto Indisponível"
        />
        <img
          title="Passe o mouse por cima para mostrar shiny"
          class="shiny"
          :src="img.front_shiny"
          alt="Foto Indisponível"
        />
      </div>
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
    <div class="informa2">
      <h3>Taxa de captura: {{ rate }}</h3>
    </div>
  </div>
</template>
<style scoped>
@import "../assets/tipos.css";

.nomeDoPokemon {
  text-transform: capitalize;
}
div.informa {
  background-color: crimson;
  color: white;
  width: 50%;
  height: fit-content;
  padding: 10px;
  margin: 2%;
  border-radius: 10px;
  border: solid 3px black;
  float: right;

  position: fixed;
  top: 7%;
  right: 1%;
}

div.informa2 {
  background-color: crimson;
  color: white;
  width: 50%;
  height: fit-content;
  padding: 10px;
  margin: 2%;
  border-radius: 10px;
  border: solid 3px black;
  float: right;

  position: fixed;
  top: 54%;
  right: 1%;
}

.fotos:hover .normalers {
  display: none;
}

.fotos:hover .shiny {
  display: initial;
}

.info {
  font-weight: 900;
  text-transform: capitalize;
}

h1 {
  font-weight: bolder;
  -webkit-text-stroke: 2px black;
}

div.informa img.normalers {
  width: 200px;
  height: auto;
  float: left;
}

div.informa img.shiny {
  width: 200px;
  height: auto;
  float: left;
  display: none;
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

/* width */
::-webkit-scrollbar {
  width: 10px;
}

/* Track */
::-webkit-scrollbar-track {
  background: rgb(146, 19, 45);
  border-radius: 20px;
}

/* Handle */
::-webkit-scrollbar-thumb {
  background: rgb(100, 11, 30);
  border-radius: 20px;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: rgb(75, 8, 22);
}
</style>
