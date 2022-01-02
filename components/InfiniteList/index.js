import React, { useCallback, useEffect, useRef } from 'react';
import { ListContainer, SpinnerWrapper } from './styles';
import Photo from '../Photo';
import { Spin } from 'antd';

export default function InfiniteList({
  gallery,
  loading,
  hasMore,
  setPage,
  onViewPhoto,
  onEditPhoto,
}) {
  const observer = useRef();

  const lastPhotoRef = useCallback(
    (node) => {
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPage((prev) => prev + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [hasMore]
  );
  return (
    <>
      <ListContainer>
        {gallery.map((photo, index) => {
          const isLastElement = gallery.length === index + 1;
          return (
            <Photo
              key={photo.data.id}
              photoIndex={index}
              photoData={photo.data}
              ref={isLastElement ? lastPhotoRef : null}
              onView={onViewPhoto}
              onEdit={onEditPhoto}
            />
          );
        })}
      </ListContainer>
      {loading && (
        <SpinnerWrapper>
          <Spin spinning />
        </SpinnerWrapper>
      )}
    </>
  );
}
