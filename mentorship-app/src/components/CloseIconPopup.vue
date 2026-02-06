<template>
  <button
    class="modal-close"
    type="button"
    aria-label="Close modal"
    @click="$emit('click')"
  >
    <img class="" src="../assets/close-icon.png" alt="Close icon" />
  </button>
</template>
<script>
export default {
  name: 'CloseIconPopup',
  components: {},
};
</script>

<style scoped lang="scss">

</style>
