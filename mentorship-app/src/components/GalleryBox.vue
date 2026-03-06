<template>
  <div class="wrapper">
    <div v-for="(image, index) in images" :key="index" class="image-wrapper">
        <CardWithComments
        :main-image="image.src"
        :comments-count="image.comments.length"
        :dislikes-count="image.dislikes"
        :likes-count="image.likes"
        @click.native="openModal(index)"
        />
    </div>

    <AddImageCard @add-image="handleAddImage" />

    <ModalCard
      v-if="currentImage"
      :visible="isModalOpen"
      :image="currentImage.src"
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
import CardWithComments from '@/components/CardWithComments.vue';

import { galleryService, GalleryImage, Comment } from '@/services/gallery.service';

import pic1 from '@/assets/pic1.png';
import pic2 from '@/assets/pic2.png';
import pic3 from '@/assets/pic3.png';
import pic4 from '@/assets/pic4.png';
import pic6 from '@/assets/pic6.png';
import pic7 from '@/assets/pic7.png';
import pic8 from '@/assets/pic8.png';

@Component({
  components: { AddImageCard, ModalCard, CardWithComments },
})
export default class GalleryBox extends Vue {
  isModalOpen = false;

  selectedIndex: number | null = null;

  images: GalleryImage[] = [
    {
      id: 867866, src: pic1, likes: 0, dislikes: 0, comments: [],
    },
    {
      id: 345342, src: pic2, likes: 0, dislikes: 0, comments: [],
    },
    {
      id: 545653, src: pic3, likes: 0, dislikes: 0, comments: [],
    },
    {
      id: 36564, src: pic4, likes: 0, dislikes: 0, comments: [],
    },
    {
      id: 323465, src: pic6, likes: 0, dislikes: 0, comments: [],
    },
    {
      id: 685686, src: pic7, likes: 0, dislikes: 0, comments: [],
    },
    {
      id: 6869687, src: pic8, likes: 0, dislikes: 0, comments: [],
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
      galleryService.save(this.images);
    }
  }

  handleDislike(): void {
    if (this.currentImage) {
      this.currentImage.dislikes += 1;
      galleryService.save(this.images);
    }
  }

  handleCommentsUpdate(updatedComments: Comment[]): void {
    if (this.currentImage) {
      this.currentImage.comments = updatedComments;
      galleryService.save(this.images);
    }
  }

  handleAddImage(file: File): void {
    const reader = new FileReader();

    reader.onload = (event: ProgressEvent<FileReader>) => {
      const result = event.target?.result;

      if (typeof result === 'string') {
        this.images.push({
          id: galleryService.generateUniqueId(),
          src: result,
          likes: 0,
          dislikes: 0,
          comments: [],
        });

        galleryService.save(this.images);
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
    const savedImages = galleryService.load();

    if (savedImages.length) {
      this.images = savedImages;
    }
  }
}
</script>

<style scoped lang="scss">
.wrapper {
  display: flex;
  width: 994px;
  flex-direction: column;
  flex-wrap: wrap;
  margin-bottom: 31px;
  height: 650px;
  position: relative;
  max-width: 995px;
  padding-bottom: 30px;
  overflow-x: auto;
  gap: 15px;
}

.wrapper::-webkit-scrollbar {
  height: 8px;
}

.wrapper::-webkit-scrollbar-track {
  background: #d1dae3;
  border-radius: 10px;
}

.wrapper::-webkit-scrollbar-thumb {
  background: #21b8c6;
  border-radius: 10px;
}

.box {
  display: flex;
  flex-direction: column;
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
.image-wrapper_image{
  width: 236px;
  height: 200px;
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
.image-wrapper{
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
