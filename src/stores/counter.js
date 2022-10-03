import { ref, computed } from "vue";
import { defineStore } from "pinia";

export const useCounterStore = defineStore("counter", () => {
  const pesquisa = ref("");
  const count = ref(0);
  const doubleCount = computed(() => count.value * 2);
  function increment() {
    count.value++;
  }
  function pesquisarPoke(nova_pesquisa) {
    pesquisa.value = nova_pesquisa.toLowerCase();
  }

  return { doubleCount, pesquisa, increment, pesquisarPoke };
});
