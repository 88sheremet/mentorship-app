export interface Comment {
  person: string;
  time: string;
  comment: string;
}

export interface GalleryImage {
  id: number;
  src: string;
  likes: number;
  dislikes: number;
  comments: Comment[];
}

const STORAGE_KEY = 'galleryImages';

export const galleryService = {
  generateUniqueId(): number {
    return Date.now() + Math.floor(Math.random() * 1000);
  },

  save(images: GalleryImage[]): void {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(images));
    } catch (error) {
      console.error('Failed to save images', error);
    }
  },

  load(): GalleryImage[] {
    const savedImages = localStorage.getItem(STORAGE_KEY);

    if (!savedImages) return [];

    try {
      const parsed = JSON.parse(savedImages);

      return parsed.map((img: any) => ({
        ...img,
        comments: img.comments || [],
      }));
    } catch (error) {
      console.error('Failed to load images', error);
      return [];
    }
  },
};
