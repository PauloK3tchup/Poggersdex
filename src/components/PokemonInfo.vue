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
      geracao: {},
      cor: {},
      shape: {},
      habitat: {},
      evolui_null: {},
      evolui_de: {},
      egg_group: {},
    };
  },
  created() {
    this.fetchGen();
    this.mudarId();
  },
  watch: {
    texto() {
      this.fetchGen();
    },
    esp_info() {
      this.mudarId();
    },
  },
  methods: {
    //Buscar geração e outras informações com base na espécie do pokémon
    fetchGen(url = "https://pokeapi.co/api/v2/pokemon-species/" + this.texto) {
      axios
        .get(url)
        .then(
          ({ data }) => (
            (this.esp_info = data),
            (this.geracao = data.generation.name),
            (this.cor = data.color.name),
            (this.shape = data.shape.name),
            (this.habitat = data.habitat.name),
            (this.evolui_null = data.evolves_from_species),
            (this.evolui_de = this.evolui_null.name),
            (this.egg_group = this.egg_groups)
          )
        );
    },
    mudarId() {
      if (
        this.esp_info.is_legendary == false &&
        this.esp_info.is_mythical == true
      ) {
        document.getElementById("informa").className = "mitico";
      } else {
        if (
          this.esp_info.is_legendary == true &&
          this.esp_info.is_mythical == false
        ) {
          document.getElementById("informa").className = "lendario";
        } else {
          if (
            this.esp_info.is_legendary == false &&
            this.esp_info.is_mythical == false
          ) {
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
      <!--ID do pokémon-->
      <p>{{ id }}</p>
      <!-- Geração do pokémon -->
      <p>{{ geracao }}</p>
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
        <div v-for="(value, index) in egg_group" :key="'value' + index">
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
