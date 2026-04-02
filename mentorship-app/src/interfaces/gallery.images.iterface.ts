import { IComment } from './comment.interface';
export interface GalleryImage {
  id: number;
  src: string;
  likes: number;
  dislikes: number;
  comments: IComment[];
}
