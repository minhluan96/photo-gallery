import axios from 'config/axios';
import { takeLatest, call, put } from 'redux-saga/effects';
import { actions } from '../actions';
import {
  onSetGallery,
  onSetPhoto,
  onUpdatePhotoData,
} from '../reducers/gallery';
import {
  getAllImages,
  getStoredImagesByPage,
  saveImages,
  savePhoto,
} from '../utils';

function* onUploadImage({ params, onSuccess, onFailure }) {
  try {
    const formData = new FormData();
    formData.append('image', params.image);
    formData.append('key', process.env.API_KEY);
    formData.append('name', params.name);

    const response = yield call(axios.post, `/1/upload`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });

    const newPhoto = {
      ...response,
      data: {
        ...response.data,
        name: params.name,
        description: params.description,
      },
    };
    savePhoto(newPhoto);

    yield put(onSetPhoto(newPhoto));
    onSuccess(newPhoto);
  } catch (error) {
    onFailure(error);
  }
}

function* onGetGallery({ params, onSuccess, onFailure }) {
  try {
    const { page, perPage } = params;
    const photoData = getStoredImagesByPage(page, perPage);
    yield put(onSetGallery(photoData));
    onSuccess(photoData);
  } catch (e) {
    onFailure(e);
  }
}

function* onUpdatePhotoInGallery({ params, onSuccess, onFailure }) {
  try {
    const { id, name, description } = params;
    const currentStoreImages = getAllImages();

    const updatedGallery = currentStoreImages.map((photo) => {
      if (photo.data.id === id) {
        return {
          ...photo,
          data: {
            ...photo.data,
            name,
            description,
          },
        };
      }
      return photo;
    });

    saveImages(updatedGallery);
    yield put(onUpdatePhotoData(params));
    onSuccess();
  } catch (e) {
    onFailure(e);
  }
}

export default function* watcher() {
  yield takeLatest(actions.gallery.upload, onUploadImage);
  yield takeLatest(actions.gallery.listPhotos, onGetGallery);
  yield takeLatest(actions.gallery.updatePhoto, onUpdatePhotoInGallery);
}
