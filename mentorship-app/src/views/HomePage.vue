<template>
  <div class="home-wrapper">
    <h1 id="header" class="header">
      Welcome to Viseven <span>imagestock</span>
    </h1>

    <GalleryBox />

    <ScrollBar />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

import GalleryBox from '@/components/GalleryBox.vue';
import ScrollBar from '@/components/ScrollBar.vue';

@Component({
  components: {
    GalleryBox,
    ScrollBar,
  },
})
export default class HomePage extends Vue {}
</script>

<style scoped lang="scss">
.home-wrapper {
  padding: 17px 16px;
  background: url("../assets/bg.png") center / cover no-repeat;
}

.header {
  font-size: 24px;
  text-transform: uppercase;
  margin-bottom: 3px;
  padding-left: 8px;

  span {
    color: #21b8c6;
  }
}
</style>
