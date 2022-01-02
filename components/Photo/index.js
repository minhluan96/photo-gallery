import React from 'react';
import {
  ActionRow,
  EditButton,
  PhotoOverlayContainer,
  PhotoWrapper,
  StyledIcon,
  StyledImage,
  ViewButton,
} from './styles';

const Photo = React.forwardRef(
  ({ photoData, photoIndex, onView, onEdit }, ref) => {
    return (
      <PhotoWrapper ref={ref}>
        <StyledImage src={photoData.display_url} alt={photoData.title} />
        <PhotoOverlayContainer>
          <ActionRow>
            <ViewButton
              type='link'
              icon={<StyledIcon className='uil uil-eye' />}
              onClick={() => onView(photoData, photoIndex)}
            />
            <EditButton
              type='link'
              icon={<StyledIcon className='uil uil-edit-alt' />}
              onClick={() => onEdit(photoData)}
            />
          </ActionRow>
        </PhotoOverlayContainer>
      </PhotoWrapper>
    );
  }
);

export default Photo;
