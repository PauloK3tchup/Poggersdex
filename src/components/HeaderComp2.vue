<template>
  <header class="menu-superior">
    <div class="menu-esquerdo">
      <span><RouterLink to="/" class="botão"> Home </RouterLink></span>
      <span> | </span>
      <span> <RouterLink to="/about" class="botão"> About </RouterLink> </span>
    </div>
    <div class="menu-direito">
      <span>
        <RouterLink to="/" class="botão"> Sair </RouterLink>
      </span>
    </div>
  </header>
</template>

<style>
header.menu-superior {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

header {
  background-color: crimson;
  color: white;
  height: 15%;
  font-size: 1.3rem;
  display: flex;
  align-items: center;
  padding-left: 2rem;
  padding: 20px;
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
  transform: scale(1.5) rotate(5deg);
}
</style>
