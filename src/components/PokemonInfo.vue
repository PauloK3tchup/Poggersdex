<script>
export default {
  props: ["habilidade", "img", "texto", "id", "tipo"],
};
</script>
<template>
  <div class="block">
    <h1 class="nomeDoPokemon">{{ texto }}</h1>
    <h3 class="nomeDoPokemon">{{ tipo }}</h3>
    <p>{{ id }}</p>
    <img :src="img" alt="wha" />
    <p>{{ habilidade }}</p>
  </div>
</template>
<style>
.nomeDoPokemon {
  text-transform: capitalize;
}
</style>
