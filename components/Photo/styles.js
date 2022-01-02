import styled from 'styled-components';
import {Button} from "antd";

export const PhotoWrapper = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  border-radius: 8px;
  border: 1px solid #f0f0f0;

  :hover {
    background-color: #f0f0f0;
    z-index: 2;
    cursor: pointer;

    img {
      opacity: 0.3;
    }

    div {
      opacity: 1;
    }
  }
`;

export const StyledImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
  transition: 0.5s ease;
  backface-visibility: hidden;
`;

export const PhotoOverlayContainer = styled.div`
  transition: 0.5s ease;
  opacity: 0;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  -ms-transform: translate(-50%, -50%);
  text-align: center;
`;

export const ActionRow = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 16px 0;
`;

export const ViewButton = styled(Button)`
  margin-right: 8px;
  color: #000;
`;

export const EditButton = styled(Button)`
  margin-left: 8px;
  color: #000;
`;

export const StyledIcon = styled.i`
  font-size: 36px;
  font-weight: 300;
`;

