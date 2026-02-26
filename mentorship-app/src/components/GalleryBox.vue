<template>
  <div class="wrapper">
    <div v-for="(image, index) in images" :key="index" class="image-wrapper">
      <button @click="openModal(index)">
        <img
        :src="image.src"
        alt="Image"
        :class="`box3__inner-box${index + 3}`"/>
      </button>
    </div>

    <AddImageCard @add-image="handleAddImage" />

    <ModalCard
      v-if="currentImage"
      :visible="isModalOpen"
      :image="currentImage.src"
      :image-id="currentImage.id"
      :likes="currentImage.likes"
      :dislikes="currentImage.dislikes"
      :initial-comments="currentImage.comments"
      @close="closeModal"
      @like="handleLike"
      @dislike="handleDislike"
      @update:comments="handleCommentsUpdate"
    />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import AddImageCard from '@/components/AddImageCard.vue';
import ModalCard from '@/components/ModalCard.vue';

import pic1 from '@/assets/pic1.png';
import pic2 from '@/assets/pic2.png';
import pic3 from '@/assets/pic3.png';
import pic4 from '@/assets/pic4.png';
import pic6 from '@/assets/pic6.png';
import pic7 from '@/assets/pic7.png';
import pic8 from '@/assets/pic8.png';

interface Comment {
  person: string;
  time: string;
  comment: string;
}

interface GalleryImage {
  id: number;
  src: string;
  likes: number;
  dislikes: number;
  comments: Comment[];
}

@Component({
  components: { AddImageCard, ModalCard },
})
export default class GalleryBox extends Vue {
  isModalOpen = false;

  selectedIndex: number | null = null;

  images: GalleryImage[] = [
    {
      id: 1, src: pic1, likes: 0, dislikes: 0, comments: [],
    },
    {
      id: 2, src: pic2, likes: 0, dislikes: 0, comments: [],
    },
    {
      id: 3, src: pic3, likes: 0, dislikes: 0, comments: [],
    },
    {
      id: 4, src: pic4, likes: 0, dislikes: 0, comments: [],
    },
    {
      id: 5, src: pic6, likes: 0, dislikes: 0, comments: [],
    },
    {
      id: 6, src: pic7, likes: 0, dislikes: 0, comments: [],
    },
    {
      id: 7, src: pic8, likes: 0, dislikes: 0, comments: [],
    },
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

  handleCommentsUpdate(updatedComments: Comment[]): void {
    if (this.currentImage) {
      this.currentImage.comments = updatedComments;
      this.saveImages();
    }
  }

  handleAddImage(file: File): void {
    const reader = new FileReader();

    reader.onload = (event: ProgressEvent<FileReader>) => {
      const result = event.target?.result;

      if (typeof result === 'string') {
        const newId = this.generateUniqueId();

        this.images.push({
          id: newId,
          src: result,
          likes: 0,
          dislikes: 0,
          comments: [],
        });

        this.saveImages();
      }
    };

    reader.readAsDataURL(file);
  }

  // eslint-disable-next-line class-methods-use-this
  generateUniqueId(): number {
    const newId = Date.now() + Math.floor(Math.random() * 1000);
    return newId;
  }

  saveImages(): void {
    try {
      localStorage.setItem('galleryImages', JSON.stringify(this.images));
    } catch (error) {
      console.error('Failed to save images', error);
    }
  }

  loadImages(): void {
    const savedImages = localStorage.getItem('galleryImages');

    if (savedImages) {
      try {
        const parsed = JSON.parse(savedImages);
        this.images = parsed.map((img: any) => ({
          ...img,
          comments: img.comments || [],
        }));
      } catch (error) {
        console.error('Failed to load images', error);
      }
    }
  }

  mounted(): void {
    this.loadImages();
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
.box3__inner-box10{
  width: 240px;
  height: 210px;
}
.box3__inner-box11{
  width: 240px;
  height: 210px;
}
.box3__inner-box12{
  width: 240px;
  height: 210px;
}
.box3__inner-box13{
  width: 240px;
  height: 210px;
}
.box3__inner-box14{
  width: 240px;
  height: 210px;
}
.box3__inner-box15{
  width: 240px;
  height: 210px;
}
.box3__inner-box16{
  width: 240px;
  height: 210px;
}
.box3__inner-box17{
  width: 240px;
  height: 210px;
}
</style>
