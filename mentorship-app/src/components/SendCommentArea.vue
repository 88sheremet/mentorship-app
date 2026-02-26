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

  @Prop({ type: [String, Number], required: true })
  readonly imageId!: string | number;

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

  /* Firefox */
  scrollbar-width: thin;
  scrollbar-color: #21b8c6 #e0e0e0;

  &::-webkit-scrollbar {
    width: 10px;
  }

  &::-webkit-scrollbar-track {
    background: #e0e0e0;
    border-radius: 20px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #21b8c6;
    border-radius: 20px;
    border: 3px solid transparent;
    background-clip: content-box;
  }
}

.no-comments {
  color: #999;
  font-style: italic;
  margin-bottom: 15px;
  padding-left: 33px;
}
</style>
