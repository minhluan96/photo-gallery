import { actions } from '../actions';

export const INITIAL_STATE = {
  photos: [],
};

const galleryReducer = (state = INITIAL_STATE, action = {}) => {
  switch (action.type) {
    case actions.gallery.setPhoto:
      return {
        ...state,
        photos: [...state.photos, action.payload],
      };
    case actions.gallery.setGallery: {
      const { data } = action.payload;

      return {
        ...state,
        photos: [...state.photos, ...data],
      };
    }
    case actions.gallery.setUpdatedPhoto: {
      const { id } = action.payload;

      const currentState = state.photos;
      const updatedState = [...currentState].map((photo) => {
        if (photo.data.id === id) {
          return {
            ...photo,
            data: {
              ...photo.data,
              ...action.payload,
            },
          };
        }
        return photo;
      });

      return {
        ...state,
        photos: updatedState,
      };
    }

    default:
      return state;
  }
};

export default galleryReducer;

export const onSetPhoto = (data) => ({
  type: actions.gallery.setPhoto,
  payload: data,
});

export const onSetGallery = (data) => ({
  type: actions.gallery.setGallery,
  payload: data,
});

export const onUpdatePhotoData = (data) => ({
  type: actions.gallery.setUpdatedPhoto,
  payload: data,
});
