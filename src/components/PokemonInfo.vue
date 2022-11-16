<script>
// import axios from "axios"; (não sendo utilizado no momento)
export default {
  data() {
    return {
      evo1: {},
    };
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
    "e_mitico",
    "e_lendario",
    "felicidade",
    "cor",
    "formato",
  ],
  created() {
    this.mudarId();
  },
  watch: {
    e_lendario() {
      this.mudarId();
    },
    e_mitico() {
      this.mudarId();
    },
  },
  methods: {
    mudarId() {
      if (this.e_lendario == false && this.e_mitico == true) {
        document.getElementById("informa").className = "mitico";
      } else {
        if (this.e_lendario == true && this.e_mitico == false) {
          document.getElementById("informa").className = "lendario";
        } else {
          if (this.e_lendario == false && this.e_mitico == false) {
            document.getElementById("informa").className = "normal";
          }
        }
      }
    },
  },
};
</script>
<template>
  <div class="tudo">
    <!-- Caixa de informações superior -->
    <div id="informa" class="">
      <!--Nome do pokémon-->
      <h1 class="nomeDoPokemon">{{ texto }}</h1>
      <span v-if="e_lendario == true" id="tipoTexto" class="tipo_lendario"
        >Lendário</span
      >
      <span v-if="texto == 'amoonguss'" id="tipoTexto" class="tipo_lendario"
        >Sus</span
      >
      <span v-if="e_mitico == true" id="tipoTexto" class="tipo_mitico"
        >Mítico</span
      >
      <!--ID do pokémon-->
      <p>{{ id }}</p>
      <!-- Geração do pokémon -->
      <p>{{ geração }}</p>
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
    <!-- Caixa de informações inferior -->
    <div id="informa2" class="">
      <h2>Shiny:</h2>
      <img class="shiny" :src="img.front_shiny" alt="Foto Indisponível" />
      <!-- Taxa de captura do pokémon -->
      <h3>Taxa de captura: {{ rate }}</h3>
      <h3>Felicidade Base: {{ felicidade }}</h3>
      <h3>Cor: {{ cor }}</h3>
      <h3>Formato: {{ formato }}</h3>
    </div>
  </div>
</template>
<style scoped>
@import "../assets/tipos.css";

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

div.mitico {
  background: linear-gradient(
    45deg,
    rgb(194, 15, 194),
    rgb(194, 15, 194),
    rgb(194, 15, 194),
    rgb(194, 15, 194),
    rgb(194, 15, 194),
    rgb(194, 15, 194),
    violet,
    rgb(194, 15, 194),
    rgb(194, 15, 194),
    rgb(194, 15, 194),
    rgb(194, 15, 194),
    rgb(194, 15, 194),
    rgb(194, 15, 194),
    rgb(194, 15, 194)
  );
  background-size: 300%;
  animation: border 4s linear infinite;
}

div.lendario {
  background: linear-gradient(
    45deg,
    rgb(220, 150, 20),
    rgb(220, 150, 20),
    rgb(220, 150, 20),
    rgb(220, 150, 20),
    rgb(220, 150, 20),
    rgb(220, 150, 20),
    yellow,
    rgb(220, 150, 20),
    rgb(220, 150, 20),
    rgb(220, 150, 20),
    rgb(220, 150, 20),
    rgb(220, 150, 20),
    rgb(220, 150, 20),
    rgb(220, 150, 20)
  );
  background-size: 300%;
  animation: border 4s linear infinite;
}

@keyframes border {
  0%,
  100% {
    background-position: 0 0;
  }

  50% {
    background-position: 300%;
  }
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
