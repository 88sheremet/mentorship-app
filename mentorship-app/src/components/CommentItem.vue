<template>
  <div class="comment-item-wrapper">
    <div class="comment-item-wrapper__top">
      <p class="comment-item-wrapper__top-person">{{ person }}</p>
      <p class="comment-item-wrapper__top-time">{{ time }}</p>
    </div>
    <div class="comment-item-wrapper__bottom">
      <p class="comment-item-wrapper__bottom-text">{{ comment }}</p>
    </div>
  </div>
</template>
<script>
export default {
  name: 'CommentItem',
  components: {},
  props: {
    person: {
      type: String,
      required: true,
    },
    time: {
      type: String,
      required: true,
    },
    comment: {
      type: String,
      required: true,
    },
  },
};
</script>

<style scoped lang="scss">
.comment-item-wrapper {
  display: flex;
  flex-direction: column;
}
.comment-item-wrapper__top {
  display: flex;
  justify-content: space-between;
  margin-bottom: 3px;
}
.comment-item-wrapper__top-person {
  font-size: 11px;
}
.comment-item-wrapper__top-time {
  font-size: 11px;
}
.comment-item-wrapper__bottom-text {
  font-size: 14px;
  line-height: 16px;
  width: 265px;
}
.comment-item-wrapper__bottom {
  border: 1px solid #a1b1bb;
  padding: 13px 10px;
}
</style>
