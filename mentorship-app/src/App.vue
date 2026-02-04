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
  color: #808080;
}
html, body {
  width: 1024px;
  margin: 0;
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
  cursor: pointer;
}

// body{
//     background: var(--background-color);
//     color: var(--white-color);
//     font-family: 'Inter', sans-serif;
//     letter-spacing: 0.03em;
//     font-weight: 400;
// }

ul{
  list-style: none;
}
</style>
