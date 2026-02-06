<template>
  <div class="input-wrapper">
    <label for="nickname">
      <input
        id="nickname"
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
          type="text"
          placeholder="Write your comment here..."
        />
      </label>
      <button class="button-send">
        <img
          src="../assets/popup-send-icon.png"
          alt="Send icon"
          class="button-send__icon"
        />
      </button>
    </div>
  </div>
</template>
<script>
export default {
  name: 'InputArea',
  components: {},
};
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
