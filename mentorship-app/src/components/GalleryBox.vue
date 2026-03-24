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

    <AddImageCard @open-search="openSearchPopup"/>

   <SearchImagePopup
     :visible="isSearchPopupOpen"
     @close="closeSearchPopup"
     @select-image="addImageFromSearch"
     />

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
import SearchImagePopup from '@/components/SearchImagePopup.vue';

import ModalCard from '@/components/ModalCard.vue';
import CardWithComments from '@/components/CardWithComments.vue';

import galleryService from '@/services/gallery.service';
import { Comment } from '@/interfaces/comment.interface';
import { GalleryImage } from '@/interfaces/gallery.images.iterface';

@Component({
  components: {
    ModalCard, CardWithComments, SearchImagePopup, AddImageCard,
  },
})
export default class GalleryBox extends Vue {
  isModalOpen = false;

  isSearchPopupOpen = false;

  selectedIndex: number | null = null;

  images: GalleryImage[] = [];

  get currentImage(): GalleryImage | null {
    return this.selectedIndex !== null
      ? this.images[this.selectedIndex] || null
      : null;
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

  async fetchImages(): Promise<void> {
    try {
      const response = await fetch('https://api.unsplash.com/photos/random?client_id=lViX2vRt9epgPRt_OWXB_g7Y91wdrXCyM4h9S1O4iOM&count=20');
      const data = await response.json();

      this.images = data.map((img: any) => ({
        id: Number(img.id),
        src: img.urls.thumb,
        likes: 0,
        dislikes: 0,
        comments: [],
      }));
      galleryService.save(this.images);
    } catch (error) {
      console.error('API ERROR:', error);
    }
  }

  openSearchPopup(): void {
    this.isSearchPopupOpen = true;
  }

  closeSearchPopup(): void {
    this.isSearchPopupOpen = false;
  }

  addImageFromSearch(src: string): void {
    this.images.push({
      id: galleryService.generateUniqueId(),
      src,
      likes: 0,
      dislikes: 0,
      comments: [],
    });

    galleryService.save(this.images);
    this.closeSearchPopup();
  }

  mounted(): void {
    const savedImages = galleryService.load();

    if (savedImages.length) {
      this.images = savedImages;
    } else {
      this.fetchImages();
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
  background: var(--scrollbar-color);
  border-radius: 10px;
}

.wrapper::-webkit-scrollbar-thumb {
  background: var(--accent-color);
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
