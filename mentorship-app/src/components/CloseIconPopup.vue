<template>
  <button
    class="modal-close"
    type="button"
    aria-label="Close modal"
    @click="handleClick"
  >
    <img :src="closeIcon" alt="Close icon" />
  </button>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import closeIconImg from '../assets/close-icon.png';

@Component
export default class CloseIconPopup extends Vue {
  closeIcon = closeIconImg;

  handleClick(): void {
    this.$emit('click');
  }
}
</script>

<style scoped lang="scss">
</style>
