<script>
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
    "movimentos",
  ],
};
</script>
<template>
  <div class="informa">
    <h1 class="nomeDoPokemon">{{ texto }}</h1>
    <p>{{ id }}</p>
    <div class="tipo">
      <h2>Tipos:</h2>
      <div v-for="(value, index) in tipo" :key="'value' + index">
        <span id="tipoTexto" :class="value.type.name">
          {{ value.type.name }}
        </span>
      </div>
    </div>
    <img :src="img" alt="wha oshi" />
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
    <h1 class="nomeDoPokemon">Movimentos:</h1>
    <div v-for="(value, index) in movimentos" :key="'value' + index">
      <span id="tipoTexto" :class="value.type.name">
        {{ value.move.name }}
      </span>
    </div>
  </div>
</template>
<style scoped>
@import "../assets/tipos.css";

.nomeDoPokemon {
  text-transform: capitalize;
}

div.informa2 {
  background-color: crimson;
  color: white;
  width: 50%;
  height: 25%;
  padding: 10px;
  margin: 2%;
  border-radius: 10px;
  border: solid 3px black;
  float: right;

  position: fixed;
  bottom: 10%;
  right: 10%;
}

div.informa {
  background-color: crimson;
  color: white;
  width: 50%;
  height: 45%;
  padding: 10px;
  margin: 2%;
  border-radius: 10px;
  border: solid 3px black;
  float: right;

  position: fixed;
  top: 10%;
  right: 10%;
}

.info {
  font-weight: 900;
  text-transform: capitalize;
}

h1 {
  font-weight: bolder;
  -webkit-text-stroke: 2px black;
}

div.informa img {
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
  margin: 5px;
  background-color: rgb(146, 19, 45);
  padding: 20px;
  border-radius: 10px;
}
</style>
