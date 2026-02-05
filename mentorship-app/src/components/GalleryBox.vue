<template>
  <div class="wrapper">
    <div class="box">
      <div class="box__horizontal">
        <button class="box__horizontal-wrapper" @click="isModalOpen = true">
          <img class="box__inner-img" src="../assets/pic1.png" alt="Image"/>
        </button>
      </div>
      <div class="box__horizontal2">
        <button class="box__horizontal2-wrapper">
          <img class="box__inner-img" src="../assets/pic4.png" alt="Image" />
        </button>
        <CardWithComments />
      </div>
    </div>
    <div class="box2">
      <div class="box__vertical1">
        <button class="box__vertical1">
          <img class="box__inner-img" src="../assets/pic2.png" alt="Image" />
        </button>
      </div>
      <div class="box__vertical2">
        <button class="box__vertical2-wrapper">
          <img class="box__inner-img" src="../assets/pic3.png" alt="Image" />
        </button>
        <button class="box__vertical2-wrapper">
          <img
            class="box__inner-img box__inner-img-third"
            src="../assets/pic6.png"
            alt="Image"
          />
        </button>
      </div>
    </div>
    <div class="box3">
      <div class="box3__inner-box box3__inner-box1">
        <img src="../assets/pic7.png" alt="Image" />
      </div>
      <div class="box3__inner-box box3__inner-box2">
        <img src="../assets/pic8.png" alt="Image" />
      </div>
      <AddImageCard />
    </div>

       <ModalCard
      :visible="isModalOpen"
      @close="isModalOpen = false"
    >
      <h2>Header</h2>
      <p>Content</p>
    </ModalCard>
  </div>
</template>
<script>
import AddImageCard from '@/components/AddImageCard.vue';
import ModalCard from '@/components/ModalCard.vue';
import CardWithComments from '@/components/CardWithComments.vue';

export default {
  name: 'GalleryBox',
  components: {
    AddImageCard,
    ModalCard,
    CardWithComments,
  },
  data() {
    return {
      isModalOpen: false,
    };
  },
};
</script>

<style scoped lang="scss">
.wrapper {
  display: flex;
  width: 995px;
  flex-wrap: wrap;
  margin-bottom: 31px;
}
.box {
  display: flex;
  flex-direction: column;
}
.box2 {
  display: flex;
  margin-left: -8px;
}
.box__horizontal2 {
  display: flex;
  margin-top: -12px;
}

.box__inner-img-third {
  margin-top: -8px;
}
.box__vertical2 {
  display: flex;
  flex-direction: column;
  margin-left: -8px;
}
.box3 {
  display: flex;
  margin-top: -12px;
}
.box3__inner-box2 {
  margin-left: -7px;
}
</style>
