<script>
import { useCounterStore } from "../stores/counter";
import { mapStores, mapActions, mapState } from "pinia";
export default {
  data() {
    return {
      pesquisa_alteravel: "bulbasaur",
    };
  },
  computed: {
    ...mapStores(useCounterStore),
    ...mapState(useCounterStore, ["count", "pesquisa"]),
  },
  methods: {
    ...mapActions(useCounterStore, ["increment", "pesquisarPoke"]),
  },
};
</script>
<template>
  <header class="menu-superior">
    <div class="menu-esquerdo">
      <span
        ><RouterLink to="/" class="botão">
          <img class="vitinho" src="../assets/Victini_Icon.png" alt="vitinho" />
          PoggersDex
        </RouterLink></span
      >
      <div class="pesquisa">
        <input
          class="pesquisarInput"
          placeholder="Exemplo: mew ou 151"
          type="text"
          v-model="nova_pesquisa"
          @keydown.enter="pesquisarPoke(nova_pesquisa)"
        />
        <button class="pesquisarBotao" @click="pesquisarPoke(nova_pesquisa)">
          Pesquisar
        </button>
      </div>
    </div>
    <!-- <div class="menu-direito">
      <span>
        <RouterLink to="/" class="botão"> Sair </RouterLink>
      </span>
    </div> -->
  </header>
</template>

<style scoped>
div.pesquisa {
  float: right;
}
header.menu-superior {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

header {
  background-color: crimson;
  color: white;
  height: 10%;
  width: 100%;
  font-size: 30px;
  display: flex;
  align-items: center;
  padding-left: 2rem;
  padding: 20px;
  position: fixed;
  margin: 0%;
  z-index: 5;
}

header span {
  padding: 0% 20px;
  font-weight: bold;
}

a.botão {
  text-decoration: none;
  color: white;
  display: inline-block;
  font-weight: bold;
  transition: 0.25s;
}

a.botão:hover {
  transform: scale(1.3) rotate(5deg);
}

.vitinho {
  height: 40px;
  float: left;
}
</style>
