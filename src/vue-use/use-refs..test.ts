/**
 * @vitest-environment happy-dom
 */
import { expect, it } from 'vitest';
import { createApp, defineComponent, h } from 'vue';

import { useRefs } from '.';

type CustomInstanceType<V> = V extends abstract new (...args: any) => infer R ? R : never;
type VM<V> = CustomInstanceType<V> & { unmount(): void };

export function mount<V>(Comp: V) {
  const el = document.createElement('div');
  const app = createApp(Comp as any);

  const unmount = () => app.unmount();
  const comp = app.mount(el) as any as VM<V>;
  comp.unmount = unmount;
  return comp;
}

it('useRef' /* https://gist.github.com/iamsonnn/dbf6d8407a0959f7dc66f6d24231799c?permalink_comment_id=4809844#gistcomment-4809844 */, () => {
  const vm = mount(
    defineComponent({
      setup() {
        const { refs, toRef } = useRefs<{ input: CustomInstanceType<typeof HTMLInputElement> }>();
        return { refs, toRef };
      },
      render() {
        return h('input', { ref: this.toRef('input') });
      },
    }),
  );
  expect(vm.refs.input).toBe(vm.$el);
});
