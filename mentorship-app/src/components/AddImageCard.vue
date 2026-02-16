<template>
  <button class="add-image-card" @click="openFileDialog">
    <img class="add-image-card__img" src="../assets/pic9.png" alt="Image" />

    <div class="add-image-card__inner-wrapper">
      <img class="icon" src="../assets/add-btn.png" alt="Add image" />
      <p class="button-text">Add your<br />picture</p>
    </div>

    <label for="inputImg">
      <input
        ref="fileInput"
        type="file"
        accept="image/*"
        class="hidden-input"
        @change="handleFile"
        name="inputImg"
      />
    </label>
  </button>
</template>

<script>
export default {
  name: 'AddImageCard',
  methods: {
    openFileDialog() {
      this.$refs.fileInput.click();
    },
    handleFile(e) {
      const input = e.target;
      const file = input.files[0];

      if (!file) return;

      if (!file.type.startsWith('image/')) {
        alert('Please select an image');
        return;
      }

      this.$emit('add-image', file);

      input.value = '';
    },
  },
};
</script>

<style scoped>
.hidden-input {
  display: none;
}

.add-image-card {
  cursor: pointer;
  position: relative;
  margin-left: -8px;
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
