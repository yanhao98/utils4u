import { Popup } from 'tdesign-mobile-vue';
import { createApp, ref, VNode, watch } from 'vue';

export function openPopup(content: VNode) {
  const root = document.createElement('div');
  document.body.append(root);
  const visible = ref(false);
  const api = {
    close: () => {
      visible.value = false;
    },
  };
  const app = createApp({
    setup() {
      return () => (
        <Popup closeOnOverlayClick={false} v-model={[visible.value, 'visible']} placement="bottom">
          {content}
        </Popup>
      );
    },
  });
  /* const instance =  */ app.mount(root);
  // console.debug('root :>> ', root);
  // console.debug('instance :>> ', instance);
  visible.value = true;

  const unwatch = watch(
    () => visible.value,
    (val) => {
      if (!val) {
        setTimeout(() => {
          root.remove();
          app.unmount();
          unwatch();
        }, 300);
      }
    }
  );

  return api;
}
