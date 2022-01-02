import styled from 'styled-components';
import { Button } from 'antd';

export const StyledModal = styled.div`
  display: ${({ visible }) => (visible ? 'flex' : 'none')};
  position: fixed;
  z-index: 2;
  padding-top: 100px;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgb(0, 0, 0);
  background-color: rgba(0, 0, 0, 0.4);
`;

export const ModalContent = styled.div`
  background-color: #fefefe;
  margin: auto;
  padding: 20px;
  border: 1px solid #888;
  width: 70%;
  border-radius: 16px;
  min-height: 480px;
`;

export const NavigationWrapper = styled.div`
  justify-content: ${({ position }) => position};
  align-items: center;
  display: flex;
  padding: 0 24px;
  width: 12%;
`;

export const StyledButton = styled(Button)`
  color: #aaaaaa;
  float: right;

  &:hover {
    color: #000;
  }
`;

export const StyledIcon = styled.i`
  font-size: ${({ fontSize }) => `${fontSize || 24}px`};
  ${({ color }) =>
    color &&
    `
    color: ${color};
  `}
`;

export const StyledHeader = styled.div`
  display: flex;
  justify-content: end;
  align-items: center;
`;

export const ModalLayout = styled.div`
  display: grid;
  gap: 3em;
  -webkit-box-align: center;
  align-items: center;
  grid-template-columns: 100%;
  grid-template-rows: 480px;

  @media (min-width: 576px) {
    grid-template-columns: 1fr 0.8fr;
    grid-template-rows: 480px;
  }

  @media (min-width: 1080px) {
    grid-template-columns: 2fr 1fr;
    grid-template-rows: 640px;
  }
`;

export const ImageWrapper = styled.div`
  width: 100%;
  height: 100%;
`;

export const StyledImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
`;

export const InfoWrapper = styled.div`
  width: 100%;
  height: 100%;
`;

export const DescriptionWrapper = styled.div`
  margin: 8px 0;
  max-height: 360px;
  overflow-y: auto;
`;

export const TitleWrapper = styled.div`
  margin-top: 16px;
  word-break: break-word;
`;
