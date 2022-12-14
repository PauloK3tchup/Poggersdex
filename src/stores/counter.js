import { ref, computed } from "vue";
import { defineStore } from "pinia";

export const useCounterStore = defineStore("counter", () => {
  const pesquisa = ref("");
  const tipo = ref(0);
  const filtro = ref("");
  const count = ref(0);
  const doubleCount = computed(() => count.value * 2);
  function increment() {
    count.value++;
  }
  function pesquisarPoke(nova_pesquisa) {
    pesquisa.value = nova_pesquisa.toLowerCase();
  }
  function mudarTipo(novo_tipo) {
    tipo.value = novo_tipo.toLowerCase();
  }
  function mudarFiltro(novo_filtro) {
    filtro.value = novo_filtro.toLowerCase();
  }

  return {
    filtro,
    doubleCount,
    pesquisa,
    tipo,
    increment,
    pesquisarPoke,
    mudarTipo,
    mudarFiltro,
  };
});
