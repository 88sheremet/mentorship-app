<template>
  <div class="wrapper">
    <div class="box">
      <div class="box__horizontal">
        <button class="box__horizontal-wrapper" @click="openModal">
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
        <button class="added-image-wrapper" @click="openModal">
          <img :src="image" alt="Added image" class="added-image" />
        </button>
      </div>

      <AddImageCard @add-image="handleAddImage" />
    </div>

    <ModalCard :visible="isModalOpen" @close="closeModal" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

import AddImageCard from '@/components/AddImageCard.vue';
import ModalCard from '@/components/ModalCard.vue';
import CardWithComments from '@/components/CardWithComments.vue';

import pic1Img from '@/assets/pic1.png';
import pic2Img from '@/assets/pic2.png';
import pic3Img from '@/assets/pic3.png';
import pic4Img from '@/assets/pic4.png';
import pic6Img from '@/assets/pic6.png';
import pic7Img from '@/assets/pic7.png';
import pic8Img from '@/assets/pic8.png';

@Component({
  components: {
    AddImageCard,
    ModalCard,
    CardWithComments,
  },
})
export default class GalleryBox extends Vue {
  isModalOpen = false;

  addedImages: string[] = [];

  pic1 = pic1Img;

  pic2 = pic2Img;

  pic3 = pic3Img;

  pic4 = pic4Img;

  pic6 = pic6Img;

  pic7 = pic7Img;

  pic8 = pic8Img;

  mounted(): void {
    const savedImages = localStorage.getItem('galleryAddedImages');

    if (savedImages) {
      try {
        this.addedImages = JSON.parse(savedImages);
      } catch (error) {
        console.error('Failed to load saved images', error);
      }
    }
  }

  openModal(): void {
    this.isModalOpen = true;
  }

  closeModal(): void {
    this.isModalOpen = false;
  }

  handleAddImage(file: File): void {
    const reader = new FileReader();

    reader.onload = (event: ProgressEvent<FileReader>) => {
      const result = event.target?.result;

      if (typeof result === 'string') {
        this.addedImages.push(result);

        localStorage.setItem(
          'galleryAddedImages',
          JSON.stringify(this.addedImages),
        );
      }
    };

    reader.readAsDataURL(file);
  }
}
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
