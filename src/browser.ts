/**
 * element-ui -> src/utils/vdom.js isVNode
 */

/**
  https://stackoverflow.com/questions/37808180/disable-viewport-zooming-ios-10-safari
  https://medium.com/@littleDog/如何解決-user-scalable-no-屬性被ios-safari-ignore-e6a0531050ba
*/

export function disableWebPageZoom() {
  document.addEventListener('touchstart', function (event) {
    if (event.touches.length > 1) {
      event.preventDefault();
    }
  });
  let lastTouchEnd = 0;
  document.addEventListener(
    'touchend',
    function (event) {
      let now = new Date().getTime();
      if (now - lastTouchEnd <= 300) {
        event.preventDefault();
      }
      lastTouchEnd = now;
    },
    false
  );
  document.addEventListener('gesturestart', function (event) {
    event.preventDefault();
  });
}

/**
 * Choose file from device
 * @example const files = await chooseFile({ accept: 'image/*', multiple: true });
 */
export function chooseFile(options?: {
  accept?: string;
  multiple?: boolean;
}): Promise<FileList | null> {
  return new Promise((resolve, reject) => {
    const input = document.createElement('input');
    input.type = 'file';
    if (options) {
      input.accept = options.accept || '';
      input.multiple = options.multiple || false;
    }
    input.onchange = () => {
      resolve(input.files);
    };
    input.oncancel = () => {
      reject('User cancel');
    };
    input.click();
  });
}
