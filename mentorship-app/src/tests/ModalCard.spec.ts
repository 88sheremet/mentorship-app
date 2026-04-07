import { shallowMount } from '@vue/test-utils';
import ModalCard from '@/components/ModalCard.vue';

describe('ModalCard.vue', () => {
  const props = {
    visible: true,
    image: 'test.png',
    likes: 5,
    dislikes: 2,
    initialComments: [],
  };

  it('should emits "like" event when like button clicked', async () => {
    const wrapper = shallowMount(ModalCard, { propsData: props });

    const likeButton = wrapper.find('.like-box');
    await likeButton.trigger('click');

    expect(wrapper.emitted('like')).toBeTruthy();
  });

  it('emits "dislike" event when dislike button clicked', async () => {
    const wrapper = shallowMount(ModalCard, { propsData: props });

    const dislikeButton = wrapper.find('.dislike-box');
    await dislikeButton.trigger('click');

    expect(wrapper.emitted('dislike')).toBeTruthy();
  });
});
