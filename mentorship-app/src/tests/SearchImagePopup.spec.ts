import { mount } from '@vue/test-utils';
import SearchImagePopup from '@/components/SearchImagePopup.vue';

describe('SearchImagePopup', () => {
  it('should emits close event', async () => {
    const wrapper = mount(SearchImagePopup, {
      propsData: { visible: true },
    });

    await wrapper.find('.close-icon-popup').trigger('click');

    expect(wrapper.emitted('close')).toBeTruthy();
  });
});
