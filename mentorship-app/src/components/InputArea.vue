<template>
  <div class="input-wrapper">
    <label for="nickname">
      <input
        id="nickname"
        v-model="nickname"
        class=""
        name="nickname"
        type="text"
        placeholder="Type your nickname here..."
      />
    </label>
    <div class="comments__send">
      <label for="comment">
        <input
          id="comment"
          class=""
          name="comment"
          v-model="commentText"
          type="text"
          placeholder="Write your comment here..."
        />
      </label>
      <button class="button-send" @click="submitComment">
        <img
          :src="closeIconImg"
          alt="Send icon"
          class="button-send__icon"
        />
      </button>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Emit } from 'vue-property-decorator';
import closeIconImg from '../assets/popup-send-icon.png';

@Component
export default class CloseIconPopup extends Vue {
  closeIconImg = closeIconImg;

  nickname = '';

  commentText = '';

  get isFormValid(): boolean {
    return this.nickname.trim() !== '' && this.commentText.trim() !== '';
  }

  @Emit('submit-comment')
  submitComment(): { person: string; comment: string } | null {
    if (!this.isFormValid) {
      return null;
    }

    const commentData = {
      person: this.nickname.trim(),
      comment: this.commentText.trim(),
    };

    this.clearForm();
    return commentData;
  }

  clearForm(): void {
    this.nickname = '';
    this.commentText = '';
  }
}

</script>

<style scoped lang="scss">
.input-wrapper {
  padding-left: 33px;
}
#nickname {
  border: none;
  border-bottom: 1px solid #a1b1bb;
  padding: 4px;
  padding-left: 11px;
  font-size: 14px;
  width: 270px;
}
.comments__send {
  margin-top: 11px;
  display: flex;
  justify-content: space-between;
  width: 289px;
}
#comment {
  border: 1px solid #a1b1bb;
  border-right: none;
  padding: 4px;
  padding-left: 11px;
  font-size: 14px;
  border-radius: 3px;
  padding-top: 10px;
  padding-bottom: 23px;
  width: 223px;
}
.button-send {
  background: #21b8c6;
  border-radius: 3px;
  width: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
