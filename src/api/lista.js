import axios from "axios";

const lista = axios.create({
  baseURL: "https://pokeapi.co/api/v2/",
});

export default lista;
