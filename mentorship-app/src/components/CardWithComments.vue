<template>
  <button class="button-card">
    <img
      class="box__inner-img box__inner-img-right"
      :src="mainImage"
      alt="Image"
    />

    <div class="feedback-area">
      <div class="feedback-area__container">
        <div
          class="feedback-area__container-comments feedback-area__container__box"
        >
          <img class="comment-icon icon" :src="commentIcon" alt="Comments" />
          <div class="comment-circle circle">
            <p class="comment-circle-text circle-text">
              {{ commentsCount }}
            </p>
          </div>
        </div>

        <div class="feedback-area__container-reactions">
          <div
            class="feedback-area__container-dislike feedback-area__container__box"
          >
            <img class="dislike-icon icon" :src="dislikeIcon" alt="Dislikes" />
            <div class="dislike-circle circle">
              <p class="dislike-circle-text circle-text">
                {{ dislikesCount }}
              </p>
            </div>
          </div>

          <div
            class="feedback-area__container-like feedback-area__container__box"
          >
            <img class="like-icon icon" :src="likeIcon" alt="Likes" />
            <div class="like-circle circle">
              <p class="like-circle-text circle-text">
                {{ likesCount }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </button>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';

import commentIconImg from '../assets/comment-icon.png';
import dislikeIconImg from '../assets/dislike-icon.png';
import likeIconImg from '../assets/like-icon.png';

@Component
export default class CardWithComments extends Vue {
  @Prop({ required: true }) readonly mainImage!: string

  @Prop({ required: true }) readonly commentsCount!: number

  @Prop({ required: true }) readonly dislikesCount!: number

  @Prop({ required: true }) readonly likesCount!: number

  commentIcon = commentIconImg;

  dislikeIcon = dislikeIconImg;

  likeIcon = likeIconImg;
}
</script>

<style scoped lang="scss">
.button-card {
  position: relative;

  &:hover {
    .feedback-area {
      opacity: 1;
    }
  }
}

.feedback-area {
  opacity: 0;
  position: absolute;
  bottom: 0;
  left: 0;
  width: 219px;
  height: 60px;
  background: var(--feedback-area-color);
  padding-left: 9px;
  padding-right: 9px;
  padding-bottom: 11px;
}

.feedback-area__container {
  padding: 10px 5px;
  padding-left: 15px;
  padding-top: 15px;
  display: flex;
  justify-content: space-between;
}

.feedback-area__container-reactions {
  display: flex;
  gap: 22px;
}

.feedback-area__container__box {
  position: relative;
  width: 33px;
  height: 31px;
}

.circle {
  border-radius: 50%;
  border: 2px solid var(--primary-text-color);
  width: 14px;
  height: 14px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 0;
  right: 0;
  background: var(--white-color);
}

.circle-text {
  font-size: 11px;
  font-weight: 600;
  color: var(--circle-text-color);
}

.icon {
  position: absolute;
  left: 0;
  bottom: 0;
}
.box__inner-img{
  width: 236px;
  height: 200px;
}
</style>
