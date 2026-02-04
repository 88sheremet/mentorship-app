<template>
  <div class="wrapper">
    <h1 id="header" class="header">Welcome to Viseven <span>imagestock</span></h1>
  </div>
</template>
<script>
export default {
  name: 'HomePage',
  components: {
    // HelloWorld,
  },
};
</script>

<style scoped lang="scss">
.wrapper{
    padding: 26px;
}
.header{
    font-size: 24px;
    text-transform: uppercase;

    span{
     color: #21b8c6;
    }
}
</style>
