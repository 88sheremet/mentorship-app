export interface Comment {
  person: string;
  time: string;
  comment: string;
}

const getStorageKey = (imageId: number): string => `image_comments_${imageId}`;

export const commentService = {
  load(imageId: number): Comment[] {
    const saved = localStorage.getItem(getStorageKey(imageId));
    if (!saved) return [];

    try {
      return JSON.parse(saved);
    } catch (error) {
      console.error('Failed to load comments', error);
      return [];
    }
  },

  save(imageId: number, comments: Comment[]): void {
    try {
      localStorage.setItem(
        getStorageKey(imageId),
        JSON.stringify(comments),
      );
    } catch (error) {
      console.error('Failed to save comments', error);
    }
  },
};
