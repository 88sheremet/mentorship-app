<template>
  <div class="add-image-card">
    <img class="add-image-card__img" src="../assets/pic9.png" alt="Image" />
    <div class="add-image-card__inner-wrapper">
      <img class="icon" src="../assets/add-btn.png" alt="Buttonimage" />
      <p class="button-text">Add your<br />picture</p>
    </div>
  </div>
</template>
<script>
export default {
  name: 'AddImageCard',
  components: {},
};
</script>

<style scoped lang="scss">
.add-image-card {
  margin-left: -8px;
  position: relative;
}
.add-image-card__inner-wrapper {
  position: absolute;
  top: 79px;
  left: 96px;
  display: flex;
  flex-direction: column;
}
.button-text {
  font-size: 14px;
  text-align: center;
  font-weight: 600;
  line-height: 16px;
}
</style>
