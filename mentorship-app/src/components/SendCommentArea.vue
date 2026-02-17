<template>
  <div class="send-comment-area">
    <h2 class="send-comment-area__header">Comments: 5</h2>
    <div class="comment-item-list">
      <CommentItem
        :person="'By Anton93'"
        :time="'Today 10:21 PM'"
        :comment="'Nullam viverra leo eget urna maximus,  et pellentesque enim volutpat.'"
      />
      <CommentItem
        :person="'By Andrey'"
        :time="'5 days ago 5:21 PM'"
        :comment="'Integer velit lectus, tincidunt rhoncus  nunc ut, dapibus digni'"
      />
      <CommentItem
        :person="'By Sergey'"
        :time="'6 days ago 3:21 AM'"
        :comment="'Quisque egestas cursus ipsum, vitae  commodo nunc varius nec.'"
      />
      <CommentItem
        :person="'By Misha'"
        :time="'7 days ago 4:22 AM'"
        :comment="'Donec ut justo nulla. Duis posuere in  leo in congue.'"
      />
      <CommentItem
        :person="'By Irina'"
        :time="'8 days ago 3:21 AM'"
        :comment="comment"
      />
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import CommentItem from '@/components/CommentItem.vue';

@Component({
  components: {
    CommentItem,
  },
})
export default class SendCommentArea extends Vue {
  comment= 'Quisque convallis nec est nec maximus. Sed lacus est, congue ac metus vel, lacinia interdum nisl. Integer sit amet fndfj fbhfg bg drgtd';
}
</script>

<style scoped lang="scss">
.comment-item-list {
  display: flex;
  flex-direction: column;
  gap: 5px;
  width: 288px;
  height: 415px;
  overflow: auto;
  padding-right: 24px;
}
.send-comment-area__header {
  margin-bottom: 6px;
  font-size: 24px;
  font-weight: 600;
}
</style>
