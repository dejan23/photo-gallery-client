/* eslint-disable class-methods-use-this */
import { postRequest, getRequest } from '../utils/axios.util';

class FileUploadService {
  upload(file, onUploadProgress) {
    const formData = new FormData();

    formData.append('file', file);

    return postRequest('/images/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      onUploadProgress,
    });
  }

  getFiles() {
    return getRequest('/images');
  }
}

export default new FileUploadService();
