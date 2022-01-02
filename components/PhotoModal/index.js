import React, { useEffect } from 'react';
import {
  DescriptionWrapper,
  ImageWrapper,
  InfoWrapper,
  ModalContent,
  ModalLayout,
  NavigationWrapper,
  StyledButton,
  StyledIcon,
  StyledImage,
  StyledModal,
  TitleWrapper,
} from './styles';
import { Typography } from 'antd';

const { Title, Text, Paragraph } = Typography;

export default function PhotoModal({
  photoData,
  totalPhotos,
  onNavigate,
  onCancel,
}) {
  const onCancelHandler = () => {
    onCancel();
  };

  const leftNavigateHandler = (index) => {
    onNavigate(index);
  };

  const rightNavigateHandler = (index) => {
    onNavigate(index);
  };

  return (
    photoData && (
      <StyledModal visible={photoData}>
        <NavigationWrapper position='end'>
          <StyledButton
            disabled={photoData?.index === 0}
            type='link'
            onClick={() => leftNavigateHandler(photoData?.index - 1)}
            icon={
              <StyledIcon
                color='#fff'
                fontSize={64}
                className='uil uil-angle-left'
              />
            }
          />
        </NavigationWrapper>

        <ModalContent>
          <ModalLayout>
            <ImageWrapper>
              <StyledImage src={photoData?.display_url} alt={photoData?.name} />
            </ImageWrapper>
            <InfoWrapper>
              <StyledButton
                type='link'
                onClick={onCancelHandler}
                icon={<StyledIcon className='uil uil-times' />}
              />
              <TitleWrapper>
                <Title level={4}>{photoData?.name}</Title>
              </TitleWrapper>
              <div>
                <Text type='secondary'>Description</Text>
              </div>
              <DescriptionWrapper>
                <Paragraph>{photoData?.description}</Paragraph>
              </DescriptionWrapper>
            </InfoWrapper>
          </ModalLayout>
        </ModalContent>
        <NavigationWrapper position='start'>
          <StyledButton
            disabled={photoData?.index === totalPhotos - 1}
            type='link'
            onClick={() => rightNavigateHandler(photoData?.index + 1)}
            icon={
              <StyledIcon
                color='#fff'
                fontSize={64}
                className='uil uil-angle-right'
              />
            }
          />
        </NavigationWrapper>
      </StyledModal>
    )
  );
}
