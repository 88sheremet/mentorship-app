<template>
  <transition name="fade">
    <div
      v-if="visible"
      class="modal-overlay"
      role="button"
      tabindex="0"
      @click.self="close"
      @keydown.enter="close"
      @keydown.space="close"
    >
      <div class="modal">
        <slot />
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'ModalCard',
  props: {
    visible: {
      type: Boolean,
      required: true,
    },
  },
  mounted() {
    document.addEventListener('keydown', this.onEsc);
  },
  beforeDestroy() {
    document.removeEventListener('keydown', this.onEsc);
  },
  methods: {
    close() {
      this.$emit('close');
    },
    onEsc(e) {
      if (e.key === 'Escape') {
        this.close();
      }
    },
  },
};
</script>

<style lang="scss">
.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal {
  background: #fff;
  padding: 24px;
  border-radius: 8px;
  min-width: 320px;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.25s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
