<script>
import { RouterView } from "vue-router";
import HeaderComp from "./components/HeaderComp.vue";
import FooterComp from "./components/FooterComp.vue";
export default {
  components: { RouterView, HeaderComp, FooterComp },
};
</script>

<template>
  <nav>
    <HeaderComp />
  </nav>
  <main>
    <RouterView />
  </main>
  <FooterComp />
</template>

<style>
@import "../src/assets/base.css";
@import "../src/assets/main.css";
#app {
  max-width: 100%;
  margin: 0 auto;
  height: 100vh;
  font-weight: normal;
}

nav {
  margin: 0%;
}

main {
  height: 70%;
  margin: 0% 1% 1% 1%;
}
</style>
