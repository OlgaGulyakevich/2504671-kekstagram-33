import { FileTypes, MAX_FILE_SIZE, FileErrorMessages } from './constants.js';


const validateSubmitFile = (formData) => {
  const file = formData.get('filename');

  if (file && file.name) {
    const fileName = file.name.toLowerCase();
    const matches = FileTypes.some((type) => fileName.endsWith(type));
    if(!matches) {
      return { valid: false, error: FileErrorMessages.INVALID_TYPE };
    }
    if (file.size > MAX_FILE_SIZE) {
      return { valid: false, error: FileErrorMessages.MAX_SIZE };
    }
  }
  return { valid: true };
};

export { validateSubmitFile };
