export interface GalleryImage {
  id: number;
  src: string;
  likes: number;
  dislikes: number;
  comments: Comment[];
}
