<script>
export default {};
</script>
<template>
  <footer>
    <p>
      Este projeto foi feito por Paulo César & Gabriel Domingos utilizando a
      PokeApi.
    </p>
    <a href="https://www.deviantart.com/termatior0"
      >Arte do loading (pokebola) por termatior0</a
    >
  </footer>
</template>
<style scoped>
footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

a {
  color: white;
}

footer {
  background-color: crimson;
  color: white;
  height: 7%;
  width: 100%;
  font-size: 15px;
  display: flex;
  align-items: center;
  padding-left: 2rem;
  padding: 15px;
  margin: 0%;
  z-index: 5;
  position: fixed;
  bottom: 0;
  left: 0;
}

footer span {
  padding: 0% 20px;
  font-weight: bold;
}
</style>
