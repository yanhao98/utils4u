// https://developer.mozilla.org/zh-CN/docs/Web/API/Window/showOpenFilePicker

type FileSelectionOptions = {
  accept?: string;
  multiple?: boolean;
};

export function showOpenFilePicker(options: FileSelectionOptions): Promise<FileList> {
  return new Promise((resolve, reject) => {
    const input = document.createElement('input');
    input.type = 'file';
    if (options) {
      input.accept = options.accept || '';
      input.multiple = options.multiple || false;
    }
    input.addEventListener('change', () => {
      resolve(input.files!);
    });
    input.addEventListener('cancel', () => {
      reject('User cancel');
    });
    input.click();
  });
}
