import About from '@/views/About.vue';
import { mount } from '@vue/test-utils';

describe('About.vue', () => {
  test('renders inner text', () => {
    const wrapper = mount(About);

    expect(wrapper.text()).toContain('page');
  });
});
