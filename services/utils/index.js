export const saveImages = (gallery) => {
  // remove all the current data and update
  localStorage.removeItem('GALLERY');
  localStorage.setItem('GALLERY', JSON.stringify(gallery));
};

export const savePhoto = (photoData) => {
  const currentGalleryObj = localStorage.getItem('GALLERY');
  if (!currentGalleryObj) {
    localStorage.setItem('GALLERY', JSON.stringify([photoData]));
  } else {
    const currentGallery = JSON.parse(currentGalleryObj);
    const newGallery = [...currentGallery, photoData];

    localStorage.setItem('GALLERY', JSON.stringify(newGallery));
  }
};

export const getStoredImagesByPage = (page, perPage = 8) => {
  const galleryObj = localStorage.getItem('GALLERY');

  if (!galleryObj)
    return {
      data: [],
      page,
      perPage,
      totalItems: 0,
      hasMore: false,
    };

  const gallery = JSON.parse(galleryObj);

  const offset = perPage * (page - 1);
  const totalItems = gallery.length;
  const paginatedItems = gallery.slice(offset, perPage * page);

  return {
    data: paginatedItems,
    page,
    perPage,
    totalItems,
    hasMore: offset < totalItems,
  };
};

export const getAllImages = () => {
  const storeObject = localStorage.getItem('GALLERY');

  if (!storeObject) return [];

  return JSON.parse(storeObject);
};
