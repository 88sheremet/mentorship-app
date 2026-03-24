<template>
  <transition name="fade">
    <div
      v-if="visible"
      class="modal-overlay"
      role="button"
      tabindex="0"
      @click.self="close"
      @keydown.enter="close"
      @keydown.space="close"
    >
      <div class="modal">
        <CloseIconPopup class="close-icon-popup" @click="close" />
        <div class="input-wrapper">
             <label for="searchImg">
          <input
            v-model="searchQuery"
            type="text"
            class="input"
            placeholder="Search images..."
          />
        </label>
        </div>
        <div class="images-grid">
          <img
               v-for="img in searchImages"
               :key="img.id"
               :src="img.src"
               class="image"
               alt=""
            />
        </div>
      </div>
    </div>
  </transition>
</template>

<script lang="ts">
import CloseIconPopup from '@/components/CloseIconPopup.vue';

import {
  Component, Vue, Prop, Emit, Watch,
} from 'vue-property-decorator';

@Component({
  components: {
    CloseIconPopup,
  },
})
export default class SearchImagePopup extends Vue {
  @Prop({ type: Boolean, required: true })
  readonly visible!: boolean;

  @Emit('close')
  close(): void {
    console.log(this);
  }

  searchImages: any[] = [];

  searchQuery = '';

  @Watch('searchQuery')
  onSearchChange(value: string): void {
    if (value.length > 2) {
      this.fetchSearchImages(value);
    }
  }

  async fetchSearchImages(query: string): Promise<void> {
    try {
      const response = await fetch(
        `https://api.unsplash.com/search/photos?client_id=lViX2vRt9epgPRt_OWXB_g7Y91wdrXCyM4h9S1O4iOM&query=${query}&per_page=12`,
      );

      const data = await response.json();
      console.log(data);
      this.searchImages = data.results.map((img: any) => ({
        id: img.id,
        src: img.urls.thumb,
      }));
    } catch (error) {
      console.error('API ERROR:', error);
    }
  }
}
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  background: var(--modal-overlay-color);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  inset: 0;
  width: 100%;
  height: 100%;
}

.modal {
  background: var(--white-color);
  border-radius: 3px;
  width: 810px;
  height: 595px;
  margin-top: 19px;
  box-shadow: 0 2px 5px var(--modal-overlay-shadow-color);
  padding: 10px;
}
.close-icon-popup {
  margin-left: 785px;
}
.input-wrapper{
    margin: 0 auto;
}
.images-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 10px;
  margin-top: 20px;
}

.image {
  width: 100%;
  height: 100px;
  object-fit: cover;
  cursor: pointer;
}
</style>
