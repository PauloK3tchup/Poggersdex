<script>
//Coisas importadas de fora
import { useCounterStore } from "../stores/counter";
import { mapStores, mapActions, mapState } from "pinia";
export default {
  data() {
    return {
      pesquisa_alteravel: "bulbasaur",
      //Variáveis do dropdown "tipos"
      tipoLista: [
        { nome: "Nenhum", valor: "0" },
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
      //Variáveis do dropdown "outros filtros"
      filtroLista: [
        { nome: "Nenhum", valor: "" },
        { nome: "MegaEvo", valor: "-mega" },
        { nome: "Gigantamax", valor: "-gmax" },
      ],
    };
  },
  //Pinia
  computed: {
    ...mapStores(useCounterStore),
    ...mapState(useCounterStore, ["count", "pesquisa", "tipo", "filtro"]),
  },
  //Pinia 2: O retorno
  methods: {
    ...mapActions(useCounterStore, [
      "increment",
      "pesquisarPoke",
      "mudarTipo",
      "mudarFiltro",
    ]),
  },
};
</script>
<template>
  <header class="menu-superior">
    <div class="menu-esquerdo">
      <!-- Logo do site -->
      <span class="titulo"
        ><RouterLink to="/" class="botão">
          <img class="vitinho" src="../assets/Victini_Icon.png" alt="vitinho" />
          PoggersDex
        </RouterLink></span
      >
      <!-- Dropdown barra de pesquisa -->
      <div class="dropdown">
        <button class="dropbtn">Pesquisar</button>
        <div class="dropdown-content">
          <div class="pesquisa">
            <input
              class="pesquisarInput"
              placeholder="Pesquise o Pokémon pelo nome"
              type="text"
              v-model="nova_pesquisa"
              @keyup.enter="pesquisarPoke(nova_pesquisa)"
            />
            <button class="poke" @click="pesquisarPoke(nova_pesquisa)">
              Pesquisar
            </button>
          </div>
        </div>
      </div>
      <!-- Dropdown "tipos" -->
      <div class="dropdown">
        <button class="dropbtn">Tipos</button>
        <div class="dropdown-content">
          <span
            v-for="tipo in tipoLista"
            :key="tipo.nome"
            :value="tipo.valor"
            :class="tipo.nome.toLowerCase()"
            id="opcao"
            @click="
              novo_tipo = tipo.valor;
              mudarTipo(novo_tipo);
            "
          >
            {{ tipo.nome }}
          </span>
        </div>
      </div>
      <!-- Dropdown "outros filtros" -->
      <div class="dropdown">
        <button class="dropbtn">Outros Filtros</button>
        <div class="dropdown-content">
          <span
            v-for="filtro in filtroLista"
            :key="filtro.nome"
            :value="filtro.valor"
            :class="filtro.nome.toLowerCase()"
            id="opcao"
            @click="
              nova_pesquisa = filtro.valor;
              pesquisarPoke(nova_pesquisa);
              novo_filtro = filtro.valor;
              mudarFiltro(novo_filtro);
            "
          >
            {{ filtro.nome }}
          </span>
        </div>
      </div>
    </div>
    <!-- <div class="menu-direito">
      <span>
        <RouterLink to="/" class="botão"> Sair </RouterLink>
      </span>
    </div> (Não sendo utilizado no momento) -->
  </header>
</template>

<style scoped>
@import "../assets/tipos.css";

/* Dropdown */
.dropbtn {
  background-color: crimson;
  font-weight: bolder;
  font-size: 20px;
  color: white;
  padding: 16px;
  border: none;
  cursor: pointer;
  border-radius: 10px;
  margin: 0 15px 0 10px;
  transition: 0.15s;
}

.dropdown {
  position: relative;
  display: inline-block;
}

.dropdown-content {
  display: none;
  position: absolute;
  background-color: rgb(124, 19, 40);
  padding: 15px;
  min-width: 160px;
  width: 480px;
  z-index: 1;
  height: fit-content;
  border-radius: 10px;
  transition: 0.15s;
}

.dropdown-content span {
  width: 150px;
  height: 50px;
  font-size: 15px;
  font-weight: bolder;
  padding: 16px 12px;
  text-decoration: none;
  display: inline-block;
  transition: 0.15s;
  border-radius: 10px;
}

.dropdown-content span:hover {
  z-index: 5;
  transform: scale(1.2) rotate(5deg);
  cursor: pointer;
}

.dropdown-content span:active {
  transform: scale(1);
  filter: brightness(0.5);
}

.dropdown:hover .dropdown-content {
  display: block;
}

.dropdown:hover .dropbtn {
  background-color: rgb(124, 19, 40);
}

/* Barra de pesquisa */

div.pesquisa {
  float: right;
}

.pesquisarInput {
  height: 40px;
  padding: 5px;
  border-radius: 10px;
  border: solid 2px black;
}

.pesquisarInput:hover {
  background-color: antiquewhite;
}

.pesquisarInput:active {
  border: solid 3px black;
}

div.pesquisa input {
  width: 350px;
}

button.poke {
  width: auto;
  height: 40px;
  border-radius: 12px;
  margin: 5px;
  background-color: rgb(66, 17, 27);
  color: rgb(255, 255, 255);
  font-size: 15px;
  font-weight: bolder;
  transition: 0.1s;
  text-transform: capitalize;
  cursor: pointer;
  border: solid 0px black;
}

button.poke:hover {
  transform: scale(1.3);
  background: linear-gradient(180deg, #ff0033 50%, white 50%);
  border: solid 3px black;
  color: rgb(255, 255, 255);
  font-weight: 1000;
  -webkit-text-stroke: 1px rgb(0, 0, 0);
}

/* Coisas gerais do header */

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

header span.titulo {
  padding: 0% 20px;
  font-weight: bold;
}

/* Logo */

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

/* Tipos */

.megaevo {
  background: linear-gradient(
    124deg,
    #ff2400,
    #e81d1d,
    #e8b71d,
    #e3e81d,
    #1de840,
    #1ddde8,
    #2b1de8,
    #dd00f3,
    #dd00f3
  );
  background-size: 1800% 1800%;
  color: rgb(255, 255, 255);

  -webkit-animation: rainbow 5s ease infinite;
  -z-animation: rainbow 5s ease infinite;
  -o-animation: rainbow 5s ease infinite;
  animation: rainbow 5s ease infinite;
}

.gigantamax {
  background: linear-gradient(
    124deg,
    rgb(161, 11, 41),
    #ff1736,
    rgb(161, 11, 41),
    rgb(161, 11, 41),
    #ff1736,
    #ff1736,
    rgb(161, 11, 41),
    #ff1736,
    #ff1736
  );
  background-size: 1800% 1800%;

  -webkit-animation: rainbow 5s ease infinite;
  -z-animation: rainbow 5s ease infinite;
  -o-animation: rainbow 5s ease infinite;
  animation: rainbow 5s ease infinite;
  color: rgb(255, 255, 255);
}

.desconhecido {
  background-color: crimson;
  color: rgb(255, 255, 255);
}
.sombra {
  background-color: crimson;
  color: rgb(255, 255, 255);
}
.nenhum {
  background-color: crimson;
  color: rgb(255, 255, 255);
}

.grama {
  background-color: #008000;
  color: white;
}

.veneno {
  background-color: rgb(92, 0, 128);
  color: white;
}

.água {
  background-color: #0059ff;
  color: white;
}

.normal {
  background-color: #2c2c2c;
  color: white;
}

.elétrico {
  background-color: #e5ff00;
  color: rgb(0, 0, 0);
}

.fogo {
  background-color: #ff5100;
  color: white;
}
.voador {
  background-color: #bdbdbd;
  color: black;
}
.terra {
  background-color: #521e00;
  color: white;
}
.pedra {
  background-color: #131313;
  color: white;
}

.inseto {
  background-color: #003a00;
  color: white;
}
.fada {
  background-color: #f500b8;
  color: white;
}
.psíquico {
  background-color: #530045;
  color: white;
}
.lutador {
  background-color: #790000;
  color: white;
}
.gelo {
  background-color: #00f7ff;
  color: rgb(0, 0, 0);
}
.sombrio {
  background-color: #000000;
  color: white;
}
.fantasma {
  background-color: #260057;
  color: white;
}
.aço {
  background-color: #a8a8a8;
  color: rgb(0, 0, 0);
}
.dragão {
  background-color: #942f00;
  color: white;
}
</style>
