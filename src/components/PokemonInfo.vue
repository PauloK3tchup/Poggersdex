<script>
export default {
  props: ["habilidade", "img", "texto", "id", "tipo"],
};
</script>
<template>
  <div class="informa">
    <h1 class="nomeDoPokemon">{{ texto }}</h1>
    <p>{{ id }}</p>
    <h3>Tipos:</h3>
    <div v-for="(value, index) in tipo" :key="'value' + index">
      <span :class="value.type.name">
        {{ value.type.name }}
      </span>
    </div>
    <img :src="img" alt="wha oshi" />
    <h3>Habilidades:</h3>
    <div v-for="(value, index) in habilidade" :key="'value' + index">
      <span class="info">
        {{ value.ability.name }}
      </span>
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
  width: 30%;
  height: auto;
  float: left;
}
</style>
