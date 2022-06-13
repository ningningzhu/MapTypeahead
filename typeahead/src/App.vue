<script>
import SearchBox from "./components/SearchBox.vue";

export default {
  components: {
    SearchBox,
  },
};
</script>

<template>
  <main>
    <SearchBox />
  </main>
</template>

<style>
@import url("https://fonts.googleapis.com/css2?family=Montserrat&display=swap");
* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
  font-family: "Montserrat", sans-serif;
}

body {
  padding: 5px;
  min-height: 100vh;
}
</style>
