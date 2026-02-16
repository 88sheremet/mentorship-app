<template>
  <div class="wrapper">
    <div class="box">
      <div class="box__horizontal">
        <button class="box__horizontal-wrapper" @click="isModalOpen = true">
          <img class="box__inner-img" :src="pic1" alt="Image" />
        </button>
      </div>
      <div class="box__horizontal2">
        <button class="box__horizontal2-wrapper">
          <img class="box__inner-img" :src="pic4" alt="Image" />
        </button>
        <CardWithComments />
      </div>
    </div>

    <div class="box2">
      <div class="box__vertical1">
        <button class="box__vertical1">
          <img class="box__inner-img" :src="pic2" alt="Image" />
        </button>
      </div>
      <div class="box__vertical2">
        <button class="box__vertical2-wrapper">
          <img class="box__inner-img" :src="pic3" alt="Image" />
        </button>
        <button class="box__vertical2-wrapper">
          <img
            class="box__inner-img box__inner-img-third"
            :src="pic6"
            alt="Image"
          />
        </button>
      </div>
    </div>

    <div class="box3">
      <div class="box3__inner-box box3__inner-box1">
        <img :src="pic7" alt="Image" />
      </div>
      <div class="box3__inner-box box3__inner-box2">
        <img :src="pic8" alt="Image" />
      </div>

      <div
        v-for="(image, index) in addedImages"
        :key="index"
        class="box3__inner-box dynamic-image"
        :class="`box3__inner-box${index + 3}`"
      >
        <button class="added-image-wrapper" @click="isModalOpen = true">
          <img :src="image" alt="Added image" class="added-image" />
        </button>
      </div>

      <AddImageCard ref="addImageComponent" @add-image="handleAddImage" />
    </div>

    <ModalCard :visible="isModalOpen" @close="isModalOpen = false" />
  </div>
</template>

<script>
import AddImageCard from '@/components/AddImageCard.vue';
import ModalCard from '@/components/ModalCard.vue';
import CardWithComments from '@/components/CardWithComments.vue';

import pic1 from '@/assets/pic1.png';
import pic2 from '@/assets/pic2.png';
import pic3 from '@/assets/pic3.png';
import pic4 from '@/assets/pic4.png';
import pic6 from '@/assets/pic6.png';
import pic7 from '@/assets/pic7.png';
import pic8 from '@/assets/pic8.png';

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
      addedImages: [],
      pic1,
      pic2,
      pic3,
      pic4,
      pic6,
      pic7,
      pic8,
    };
  },
  mounted() {
    const savedImages = localStorage.getItem('galleryAddedImages');
    if (savedImages) {
      try {
        this.addedImages = JSON.parse(savedImages);
      } catch (e) {
        console.error('Failed to load saved images', e);
      }
    }
  },
  methods: {
    handleAddImage(file) {
      const reader = new FileReader();

      reader.onload = (e) => {
        const imageDataUrl = e.target.result;

        this.addedImages.push(imageDataUrl);

        localStorage.setItem(
          'galleryAddedImages',
          JSON.stringify(this.addedImages),
        );
      };

      reader.readAsDataURL(file);
    },
  },
};
</script>

<style scoped lang="scss">
.wrapper {
  display: flex;
  width: 995px;
  flex-wrap: wrap;
  margin-bottom: 31px;
  position: relative;
  max-width: 995px;
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
  align-items: flex-start;
  gap: 0;
  position: relative;
  flex-wrap: wrap;
}

.box3__inner-box {
  flex-shrink: 0;
  margin-right: 0;
}

.box3__inner-box2 {
  margin-left: -7px;
}

.box3__inner-box3 {
  margin-left: -8px;
}

.box3__inner-box4 {
  margin-left: -8px;
}

.box3__inner-box5 {
  margin-left: -8px;
}

.added-image-wrapper {
  cursor: pointer;
  border: none;
  background: none;
  padding: 0;
  transition: opacity 0.2s;

  &:hover {
    opacity: 0.8;
  }
}

.added-image {
  display: block;
  max-width: 100%;
  height: auto;
}

.dynamic-image {
  margin: 0 auto;
  max-width: 980px;
}

</style>
