<template>
  <div class="home-wrapper">
    <h1 id="header" class="header">Welcome to Viseven <span>imagestock</span></h1>
    <GalleryBox />
  </div>
</template>

<script>
import GalleryBox from '@/components/GalleryBox.vue';

export default {
  name: 'HomePage',
  components: {
    GalleryBox,
  },
};
</script>

<style scoped lang="scss">
.home-wrapper{
    padding: 22px 15px;
    background-image: url('../assets/bg.png');
    background-position: center center;
    background-size: 1024px 768px;
    background-repeat: no-repeat;
}
.header{
    font-size: 24px;
    text-transform: uppercase;
    margin-bottom: 15px;
    padding-left: 5px;
    span{
     color: #21b8c6;
    }
}
</style>
