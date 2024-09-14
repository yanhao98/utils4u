type ChooseFileOptions = {
  accept?: string;
  multiple?: boolean;
};

export function chooseFile(options: ChooseFileOptions) {
  return new Promise((resolve, reject) => {
    const input = document.createElement('input');
    input.type = 'file';
    if (options) {
      input.accept = options.accept || '';
      input.multiple = options.multiple || false;
    }
    input.addEventListener('change', () => {
      resolve(input.files);
    });
    input.addEventListener('cancel', () => {
      reject('User cancel');
    });
    input.click();
  });
}
