<script>
import { RouterView } from "vue-router";
import HeaderComp2 from "./components/HeaderComp2.vue";
export default {
  components: { RouterView, HeaderComp2 },
};
</script>

<template>
  <nav>
    <HeaderComp2 />
  </nav>
  <main>
    <RouterView />
  </main>
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
