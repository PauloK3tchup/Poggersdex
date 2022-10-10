<script>
import { useCounterStore } from "../stores/counter";
import { mapStores, mapActions, mapState } from "pinia";
export default {
  data() {
    return {
      pesquisa_alteravel: "bulbasaur",
      tipoLista: [
        { nome: "Normal", valor: "1" },
        { nome: "Lutador", valor: "2" },
        { nome: "Voador", valor: "3" },
        { nome: "Veneno", valor: "4" },
        { nome: "Terra", valor: "5" },
        { nome: "Pedra", valor: "6" },
        { nome: "Inseto", valor: "7" },
        { nome: "Fantasma", valor: "8" },
        { nome: "Aço", valor: "9" },
        { nome: "Fogo", valor: "10" },
        { nome: "Água", valor: "11" },
        { nome: "Grama", valor: "12" },
        { nome: "Elétrico", valor: "13" },
        { nome: "Psíquico", valor: "14" },
        { nome: "Gelo", valor: "15" },
        { nome: "Dragão", valor: "16" },
        { nome: "Sombrio", valor: "17" },
        { nome: "Fada", valor: "18" },
        { nome: "Desconhecido", valor: "10001" },
        { nome: "Sombra", valor: "10002" },
      ],
    };
  },
  computed: {
    ...mapStores(useCounterStore),
    ...mapState(useCounterStore, ["count", "pesquisa", "tipo"]),
  },
  methods: {
    ...mapActions(useCounterStore, ["increment", "pesquisarPoke", "mudarTipo"]),
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
          placeholder="Pesquise o Pokémon pelo nome"
          type="text"
          v-model="nova_pesquisa"
          @keyup="pesquisarPoke(nova_pesquisa)"
        />
        <!-- <button class="pesquisarBotao" @click="pesquisarPoke(nova_pesquisa)">
          Pesquisar
        </button> -->
      </div>
      <div class="dropdown">
        <select v-model="novo_tipo" @click="mudarTipo(novo_tipo)">
          <option
            v-for="tipo in tipoLista"
            :key="tipo.nome"
            :value="tipo.valor"
          >
            {{ tipo.nome }}
          </option>
        </select>
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
div.dropdown {
  float: right;
  margin: 0 10px 0 10px;
}

div.dropdown select {
  padding: 10px;
  border-radius: 12px;
}

div.pesquisa {
  float: right;
}

div.pesquisa input {
  width: 350px;
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
