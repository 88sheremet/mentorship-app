<template>
  <div class="send-comment-area">
    <h2 class="send-comment-area__header">Comments: {{ commentsCount }}</h2>

    <div v-if="comments.length > 0" class="comment-item-list">
      <CommentItem
        v-for="(comment, index) in comments"
        :key="index"
        :person="comment.person"
        :time="comment.time"
        :comment="comment.comment"
      />
    </div>

    <div v-else class="no-comments">
      <p>No comments yet</p>
    </div>

    <AddCommentForm @submit-comment="onSubmitComment" />
  </div>
</template>

<script lang="ts">
import {
  Component, Vue, Prop,
} from 'vue-property-decorator';
import CommentItem from '@/components/CommentItem.vue';
import AddCommentForm from '@/components/InputArea.vue';

export interface Comment {
  person: string;
  time: string;
  comment: string;
}

@Component({
  components: {
    CommentItem,
    AddCommentForm,
  },
})
export default class SendCommentArea extends Vue {
  @Prop({ type: Array, default: () => [] })
  readonly comments!: Comment[];

  get commentsCount(): number {
    return this.comments.length;
  }

  onSubmitComment(commentData: { person: string; comment: string }): void {
    this.$emit('add-comment', commentData);
  }
}
</script>

<style scoped lang="scss">
.send-comment-area__header {
  margin-bottom: 6px;
  font-size: 24px;
  font-weight: 600;
  padding-left: 33px;
}

.comment-item-list {
  display: flex;
  flex-direction: column;
  gap: 5px;
  width: 288px;
  max-height: 350px;
  overflow-y: auto;
  padding-right: 24px;
  margin-bottom: 15px;
  padding-left: 33px;

  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-track {
    background: var(--scrollbar-track-color);
    border-radius: 10px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: var(--accent-color);
    border-radius: 10px;
  }
}

.no-comments {
  color: var( --modal-bottom-color);
  font-style: italic;
  margin-bottom: 15px;
  padding-left: 33px;
}
</style>
