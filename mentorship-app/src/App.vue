<template>
  <div id="app">
    <HomePage />
  </div>
</template>

<script>
import HomePage from '@/views/HomePage.vue';

export default {
  components: {
    HomePage,
  },
};
</script>

<style lang="scss">
#app {
  font-family: Open Sans, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #a1b1bb;
}
html, body {
  width: 1024px;
  margin: 0;
  max-width: 1024px;
}
h1,
h2,
h3,
h4,
h5,
h6,
p {
  margin-top: 0;
  margin-bottom: 0;
}

ul,
ol {
  margin-top: 0;
  margin-bottom: 0;
  padding-left: 0;
}

img {
  display: block;
}

.list{
  list-style: none;
}

.link {
  text-decoration: none;
}

button {
  background: none;
  border: none;
  padding: 0;
  margin: 0;
  box-shadow: none;
  appearance: none;
  -webkit-appearance: none;
  border-radius: 0;
  font: inherit;
  color: inherit;
  cursor: pointer;
}

ul{
  list-style: none;
}
</style>
