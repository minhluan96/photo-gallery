import React, { useEffect, useState } from 'react';
import { Layout, Typography } from 'antd';
import {
  BodyWrapper,
  GallerySection, StyledHeader, StyledTitle,
  UploadButton,
  UploadSection,
} from './styles';
import UploadModal from '../../components/UploadModal';
import { useDispatch, useSelector } from 'react-redux';
import InfiniteList from '../../components/InfiniteList';
import useFetchApi from '../../services/hooks/useFetchApi';
import { actions } from '../../services/actions';
import PhotoModal from '../../components/PhotoModal';
import EditModal from '../../components/EditModal';

const { Header, Content } = Layout;
const { Title, Text } = Typography;

const PAGE_SIZE = 8;

export default function HomeView() {
  const fetchApi = useFetchApi();

  const [uploadVisible, setUploadVisible] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(false);
  const [photoDetail, setPhotoDetail] = useState(null);
  const [editPhoto, setEditPhoto] = useState(null);

  const photos = useSelector((state) => state.gallery.photos);

  const onUploadClick = () => {
    setUploadVisible(true);
  };

  const onUploadCancel = () => {
    setUploadVisible(false);
  };

  useEffect(() => {
    document.title = 'Photo Gallery';
  }, []);

  const getGallery = (page) => {
    setLoading(true);
    setTimeout(() => {
      fetchApi.call({
        type: actions.gallery.listPhotos,
        params: { page, perPage: PAGE_SIZE },
        onSuccess: (response) => {
          const { hasMore } = response;
          setLoading(false);
          setHasMore(hasMore);
        },
        onFailure: (error) => {
          setLoading(false);
          console.error(error);
        },
      });
    }, 2000);
  };

  useEffect(() => {
    getGallery(currentPage);
  }, [currentPage]);

  const onCancelPhotoDetail = () => {
    setPhotoDetail(null);
  };

  const onDetailPhotoClick = (photoData, photoIndex) => {
    setPhotoDetail({ ...photoData, index: photoIndex });
  };

  const onEditPhotoClick = (photoData) => {
    setEditPhoto(photoData);
  };

  const onCancelEditPhoto = () => {
    setEditPhoto(null);
  };

  const onNavigate = (photoIndex) => {
    if (photoIndex < 0 || photoIndex >= photos.length) return;

    const navigatedPhoto = photos[photoIndex];
    setPhotoDetail({ ...navigatedPhoto.data, index: photoIndex });
  };

  return (
    <Layout>
      <StyledHeader>
        <StyledTitle level={4}>Photo Gallery</StyledTitle>
      </StyledHeader>
      <Content>
        <BodyWrapper>
          <UploadSection>
            <Title level={4}>Upload Photo</Title>
            <UploadButton onClick={onUploadClick}>Upload</UploadButton>
            <UploadModal visible={uploadVisible} onCancel={onUploadCancel} />
          </UploadSection>
          <GallerySection>
            <Title level={4}>Gallery</Title>
            <InfiniteList
              gallery={photos}
              loading={loading}
              hasMore={hasMore}
              setPage={setCurrentPage}
              onViewPhoto={onDetailPhotoClick}
              onEditPhoto={onEditPhotoClick}
            />
          </GallerySection>
          <PhotoModal
            totalPhotos={photos.length}
            photoData={photoDetail}
            onNavigate={onNavigate}
            onCancel={onCancelPhotoDetail}
          />
          <EditModal selectedPhoto={editPhoto} onCancel={onCancelEditPhoto} />
        </BodyWrapper>
      </Content>
    </Layout>
  );
}
