import { shallowMount } from '@vue/test-utils';
import GalleryBox from '@/components/GalleryBox.vue';
import galleryService from '@/services/gallery.service';

jest.mock('@/services/gallery.service', () => ({
  save: jest.fn(),
  load: jest.fn(() => []),
  generateUniqueId: jest.fn(() => 1),
}));

describe('GalleryBox.vue', () => {
  let wrapper: any;

  beforeEach(() => {
    (galleryService.save as jest.Mock).mockClear();
    (galleryService.generateUniqueId as jest.Mock).mockClear();

    wrapper = shallowMount(GalleryBox);
  });

  it('should handles like and dislike correctly', () => {
    wrapper.setData({
      images: [{ id: 1, src: 'img1.png', likes: 0, dislikes: 0, comments: [] }],
      selectedIndex: 0,
    });

    wrapper.vm.handleLike();
    wrapper.vm.handleDislike();

    expect(wrapper.vm.images[0].likes).toBe(1);
    expect(wrapper.vm.images[0].dislikes).toBe(1);
    expect(galleryService.save).toHaveBeenCalledTimes(2);
  });

  it('adds image from search correctly', () => {
    wrapper.setData({ images: [] });

    wrapper.vm.addImageFromSearch('new-image.png');

    expect(wrapper.vm.images.length).toBe(1);
    expect(wrapper.vm.images[0].src).toBe('new-image.png');
    expect(wrapper.vm.images[0].likes).toBe(0);
    expect(wrapper.vm.images[0].dislikes).toBe(0);
    expect(galleryService.save).toHaveBeenCalledTimes(1);
    expect(galleryService.generateUniqueId).toHaveBeenCalled();
  });

  it('updates comments correctly', () => {
    const commentData = { person: 'John', comment: 'Nice photo!' };

    wrapper.setData({
      images: [
        { id: 1, src: 'img1.png', likes: 0, dislikes: 0, comments: [] },
      ],
      selectedIndex: 0,
    });

    wrapper.vm.handleCommentsUpdate([
      { person: 'John', time: '2026-04-07 18:00', comment: 'Nice photo!' },
    ]);

    expect(wrapper.vm.images[0].comments.length).toBe(1);
    expect(wrapper.vm.images[0].comments[0].person).toBe('John');
    expect(wrapper.vm.images[0].comments[0].comment).toBe('Nice photo!');
    expect(galleryService.save).toHaveBeenCalledTimes(1);
  });
});
