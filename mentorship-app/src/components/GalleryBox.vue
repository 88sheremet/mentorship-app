<template>
  <div class="wrapper">
    <div v-for="(image, index) in images" :key="index" class="image-wrapper">
      <button @click="openModal(index)">
        <img :src="image.src" alt="Image" />
      </button>
    </div>

    <AddImageCard @add-image="handleAddImage" />

    <ModalCard
      v-if="currentImage"
      :visible="isModalOpen"
      :image="currentImage.src"
      :likes="currentImage.likes"
      :dislikes="currentImage.dislikes"
      @close="closeModal"
      @like="handleLike"
      @dislike="handleDislike"
    />
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator';
import AddImageCard from '@/components/AddImageCard.vue';
import ModalCard from '@/components/ModalCard.vue';

import pic1 from '@/assets/pic1.png';
import pic2 from '@/assets/pic2.png';
import pic3 from '@/assets/pic3.png';
import pic4 from '@/assets/pic4.png';
import pic6 from '@/assets/pic6.png';
import pic7 from '@/assets/pic7.png';
import pic8 from '@/assets/pic8.png';

interface GalleryImage {
  src: string;
  likes: number;
  dislikes: number;
}

@Component({
  components: { AddImageCard, ModalCard },
})
export default class GalleryBox extends Vue {
  isModalOpen = false;

  selectedIndex: number | null = null;

  images: GalleryImage[] = [
    { src: pic1, likes: 0, dislikes: 0 },
    { src: pic2, likes: 0, dislikes: 0 },
    { src: pic3, likes: 0, dislikes: 0 },
    { src: pic4, likes: 0, dislikes: 0 },
    { src: pic6, likes: 0, dislikes: 0 },
    { src: pic7, likes: 0, dislikes: 0 },
    { src: pic8, likes: 0, dislikes: 0 },
  ];

  get currentImage(): GalleryImage | null {
    if (this.selectedIndex === null) return null;
    return this.images[this.selectedIndex];
  }

  openModal(index: number): void {
    this.selectedIndex = index;
    this.isModalOpen = true;
  }

  closeModal(): void {
    this.isModalOpen = false;
    this.selectedIndex = null;
  }

  handleLike(): void {
    if (this.currentImage) {
      this.currentImage.likes += 1;
      this.saveImages();
    }
  }

  handleDislike(): void {
    if (this.currentImage) {
      this.currentImage.dislikes += 1;
      this.saveImages();
    }
  }

  handleAddImage(file: File): void {
    const reader = new FileReader();

    reader.onload = (event: ProgressEvent<FileReader>) => {
      const result = event.target?.result;

      if (typeof result === 'string') {
        this.images.push({
          src: result,
          likes: 0,
          dislikes: 0,
        });

        this.saveImages();
      }
    };

    reader.readAsDataURL(file);
  }

  saveImages(): void {
    localStorage.setItem('galleryImages', JSON.stringify(this.images));
  }

  mounted(): void {
    const savedImages = localStorage.getItem('galleryImages');

    if (savedImages) {
      try {
        this.images = JSON.parse(savedImages);
      } catch (error) {
        console.error('Failed to load images', error);
      }
    }
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
  max-width: 300px;
  width: 240px;
  height: 210px;
}

.dynamic-image {
  margin: 0 auto;
  max-width: 980px;
}
</style>
