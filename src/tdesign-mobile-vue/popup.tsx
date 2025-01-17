import {
  DateTimePicker,
  type DateTimePickerMode,
  type DateValue,
  Picker,
  type PickerColumn,
  type PickerValue,
  Popup,
} from 'tdesign-mobile-vue';
import { createApp, ref, type VNode, watch } from 'vue';
import dayjs from 'dayjs';

/* export type OpenPopupProps = {
  content: VNode;
}; */

export type OpenPickerOptions = {
  columns?: Array<PickerColumn> | ((item: Array<PickerValue>) => Array<PickerColumn>);
  defaultValue?: Array<PickerValue>;
};

export function openPicker({ columns, defaultValue }: OpenPickerOptions): Promise<PickerValue[]> {
  return new Promise((resolve, reject) => {
    const _popup = openPopup(
      <Picker
        defaultValue={defaultValue}
        columns={columns}
        onConfirm={(value) => {
          _popup.close();
          resolve(value);
        }}
        onCancel={() => {
          _popup.close();
          reject('cancel');
        }}
      />,
    );
  });
}

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
        <Popup
          v-slots={{
            default: () => content,
          }}
          closeOnOverlayClick={false}
          v-model={[visible.value, 'visible']}
          placement="bottom"
        ></Popup>
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
    },
  );

  return api;
}

type PickDateOptions = {
  title?: string;
  initValue?: string;
  start?: string;
  end?: string;
  mode?: DateTimePickerMode;
  format?: string;
};

export function pickDate({ format, title, initValue, start, end, mode }: PickDateOptions): Promise<DateValue> {
  return new Promise((resolve, reject) => {
    const _popup = openPopup(
      <DateTimePicker
        format={format || 'YYYY-MM-DD HH:mm:ss'}
        title={title || '选择日期'}
        mode={mode || 'date'}
        defaultValue={initValue || dayjs().format('YYYY-MM-DD')}
        start={start || dayjs().subtract(50, 'year').format('YYYY-MM-DD')}
        end={end || dayjs().add(50, 'year').format('YYYY-MM-DD')}
        onConfirm={(value: DateValue) => {
          _popup.close();
          resolve(value);
        }}
        onCancel={() => {
          _popup.close();
          reject('cancel');
        }}
      />,
    );
  });
}
