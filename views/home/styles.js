import styled from 'styled-components';
import {Button, Layout, Typography} from 'antd';

export const BodyWrapper = styled.div`
  padding: 64px;
  background: #fff;
`;

export const UploadSection = styled.div`
  padding: 16px 0;
  background: #fff;
`;

export const UploadButton = styled(Button)`
  && {
    border-radius: 8px;
  }
`;

export const GallerySection = styled.div`
  background: #fff;
`;

export const StyledTitle = styled(Typography.Title)`
  && {
    color: #fff;
  }
`;

export const StyledHeader = styled(Layout.Header)`
  && {
    display: flex;
    align-items: center;
  }
`;