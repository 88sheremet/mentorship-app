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
  comment =
    'Quisque convallis nec est nec maximus. Sed lacus est, congue ac metus vel, lacinia interdum nisl. Integer sit amet fndfj fbhfg bg drgtd';
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
  overflow: auto;

  /* Firefox */
  scrollbar-width: thin;
  scrollbar-color: #21b8c6 #e0e0e0;
}

/* Убираем стрелки */
:deep(.comment-item-list::-webkit-scrollbar-button) {
  display: none;
  height: 0;
  width: 0;
}

/* Настраиваем сам скролл */
:deep(.comment-item-list::-webkit-scrollbar) {
  width: 10px;
}

:deep(.comment-item-list::-webkit-scrollbar-track) {
  background: #e0e0e0;
  border-radius: 20px;
}

:deep(.comment-item-list::-webkit-scrollbar-thumb) {
  background-color: #21b8c6;
  border-radius: 20px;
  border: 3px solid transparent;
  background-clip: content-box;
}
.send-comment-area__header {
  margin-bottom: 6px;
  font-size: 24px;
  font-weight: 600;
}
</style>
