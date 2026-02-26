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
            <img
              v-if="image"
              :src="image"
              alt="Picture"
              class="modal__wrapper-left-img"
            />
            <div class="modal__wrapper-left-bottom-box">
              <button class="dislike-box likes-box" @click="dislikeImage">
                <div class="dislike-box__content likes-box__content">
                  <img :src="dislike" alt="" class="likes-box__content-img" />
                  <div class="dislike-circle likes-circle">
                    <p class="dislike-circle-text likes-circle-text">  {{ dislikes }}</p>
                  </div>
                </div>
              </button>
              <button class="like-box likes-box" @click="likeImage">
                <div class="like-box__content likes-box__content">
                  <img :src="like" alt="" class="likes-box__content-img" />
                  <div class="like-circle likes-circle">
                    <p class="like-circle-text likes-circle-text">  {{ likes }}</p>
                  </div>
                </div>
              </button>
            </div>
          </div>
          <div class="modal__wrapper-right">
            <CloseIconPopup class="close-icon-popup" @click="close" />
            <SendCommentArea
              :comments="comments"
              @add-comment="handleAddComment"/>
            <!-- <InputArea /> -->
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script lang="ts">

import {
  Component, Vue, Prop, Watch,
} from 'vue-property-decorator';

import CloseIconPopup from '@/components/CloseIconPopup.vue';

import SendCommentArea from '@/components/SendCommentArea.vue';

import { commentService, Comment } from '@/services/comment.service';

import dislikeIcon from '../assets/popup-dislike-icon.png';
import likeIcon from '../assets/popup-like-icon.png';

@Component({
  components: {
    CloseIconPopup,
    SendCommentArea,
  },
})
export default class ModalCard extends Vue {
  @Prop({ type: Boolean, required: true })
  readonly visible!: boolean

  @Prop({ default: null })
  readonly image!: string | null

  @Prop({ required: true })
  readonly likes!: number

  @Prop({ required: true })
  readonly dislikes!: number

  @Prop({ type: Array, default: () => [] })
  readonly initialComments!: Comment[];

  @Prop({ required: true })
  readonly imageId!: number

  comments: Comment[] = [];

  dislike: string = dislikeIcon

  like: string = likeIcon

  private get storageKey(): string {
    return `image_comments_${this.image}`;
  }

  mounted(): void {
    document.addEventListener('keydown', this.onEsc);

    this.comments = commentService.load(this.imageId);

    if (!this.comments.length) {
      this.comments = [...this.initialComments];
    }
  }

  loadComments(): void {
    const savedComments = localStorage.getItem(this.storageKey);
    if (savedComments) {
      try {
        this.comments = JSON.parse(savedComments);
      } catch (e) {
        console.error('Error loading comments from localStorage', e);
        this.comments = [...this.initialComments];
      }
    } else {
      this.comments = [...this.initialComments];
    }
  }

  saveComments(): void {
    try {
      localStorage.setItem(this.storageKey, JSON.stringify(this.comments));
    } catch (e) {
      console.error('Error saving comments to localStorage', e);
    }
  }

  beforeDestroy(): void {
    document.removeEventListener('keydown', this.onEsc);
  }

  close(): void {
    this.$emit('close');
  }

  onEsc(event: KeyboardEvent): void {
    if (event.key === 'Escape') {
      this.close();
    }
  }

  likeImage(): void {
    this.$emit('like');
  }

  dislikeImage(): void {
    this.$emit('dislike');
  }

  @Watch('visible')
  onVisibleChange(newVal: boolean) {
    if (newVal && this.initialComments.length > 0) {
      this.comments = [...this.initialComments];
    }
  }

  handleAddComment(commentData: { person: string; comment: string }): void {
    const newComment: Comment = {
      person: commentData.person,
      time: new Date().toLocaleString(),
      comment: commentData.comment,
    };

    const updatedComments = [...this.comments, newComment];

    commentService.save(this.imageId, updatedComments);

    this.$emit('update:comments', updatedComments);
  }
}
</script>

<style lang="scss">
.modal-overlay {
  position: fixed;
  background: rgba(211, 211, 211, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  inset: 0;
  width: 100%;
  height: 100%;
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
.modal__wrapper {
  padding-bottom: 20px;
  padding-right: 12px;
  display: flex;
}
.modal__wrapper-left {
  position: relative;
  width: 450px;
  height: 555px;
}
.modal__wrapper-left-bottom-box {
  position: absolute;
  bottom: 0;
  height: 63px;
  background: #f3f4f2;
  width: 451px;
  display: flex;
  justify-content: end;
  gap: 6px;
}
.modal__wrapper-left ::v-deep img{
  max-width: 400px;
}
.dislike-box {
  background: #d02828;
  width: 64px;
  height: 61px;
}
.like-box {
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
.likes-box__content {
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
.like-box__content {
  margin-left: 20px;
}
.modal__wrapper-right {
  padding-top: 10px;
}
.close-icon-popup {
  margin-left: 329px;
}
.send-comment-area {
  padding-left: 33px;
  margin-top: -9px;
  margin-bottom: 7px;
}
</style>
