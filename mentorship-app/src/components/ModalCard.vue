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
        <div class="modal__wrapper">
          <div class="modal__wrapper-left">
            <img src="../assets/popup-pic1.png" alt="Picture" class="modal__wrapper-left-img">
            <div class="modal__wrapper-left-bottom-box">
              <div class="dislike-box likes-box">
                <div class="dislike-box__content likes-box__content">
                  <img :src="dislike" alt="" class="likes-box__content-img">
                  <div class="dislike-circle likes-circle">
                    <p class="dislike-circle-text likes-circle-text">7</p>
                  </div>
                </div>
              </div>
              <div class="like-box likes-box">
                  <div class="like-box__content likes-box__content">
                  <img :src="like" alt="" class="likes-box__content-img">
                  <div class="like-circle likes-circle">
                    <p class="like-circle-text likes-circle-text">10</p>
                  </div>
                </div>
              </div>

            </div>
          </div>
          <div class="modal__wrapper-right"></div>

        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import dislike from '../assets/popup-dislike-icon.png';
import like from '../assets/popup-like-icon.png';

export default {
  name: 'ModalCard',
  data() {
    return {
      dislike,
      like,
    };
  },
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
  background: rgba(211, 211, 211, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  width: 1024px;
}

.modal {
background: #fff;
    border-radius: 3px;
    width: 810px;
    height: 595px;
    margin-top: 19px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.25s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}
.modal__wrapper{
  padding-bottom: 20px;
  padding-right: 12px;
}
.modal__wrapper-left{
  position: relative;
}
.modal__wrapper-left-bottom-box{
position: absolute;
    bottom: 0;
    height: 63px;
    background: #f3f4f2;
    width: 451px;
    display: flex;
    justify-content: end;
    gap: 6px;
}
.dislike-box{
  background: #d02828;
  width: 64px;
  height: 61px;
}
.like-box{
background: #e0e5e9;
    width: 64px;
    height: 61px;
    margin-right: 8px;
        margin-top: -7px;
}
.likes-circle {
  border-radius: 50%;
  border: 2px solid #a1b1bb;
  width: 15px;
  height: 15px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 0;
  right: 0;
  background: #fff;
}
.likes-circle-text {
  font-size: 11px;
  font-weight: 600;
  color: #0d7f8a;
}
.likes-box__content{
    position: relative;
    width: 34px;
    height: 30px;
    margin-left: 16px;
    margin-top: 13px;
}
.likes-box__content-img {
  position: absolute;
  left: 0;
  bottom: 0;
}
.like-box__content{
   margin-left: 20px;
}
</style>
