<template>
  <div class="scrollbar-wrapper">
    <div class="scrollbar-wrapper__area"></div>
    <GalleryBox />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class ScrollBar extends Vue {}
</script>

<style scoped lang="scss">
.scrollbar-wrapper{
    width: 975px;
    background: #D1DAE3;
    border-radius: 10px;
    height: 9px;
    margin-left: 10px;
}
.scrollbar-wrapper__area{
    width: 325px;
    background: #21b8c6;
    border-radius: 10px;
    height: 9px;
}
</style>
