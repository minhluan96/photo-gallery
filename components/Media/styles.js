import styled from 'styled-components';

const renderSpacing = (spacing) => {
  switch (spacing) {
    case 'xsm':
      return '4px';
    case 'sm':
      return '8px';
    case 'md':
      return '16px';
    case 'lg':
      return '24px';
    default:
      return '8px';
  }
};

export const MediaContainer = styled.div`
  display: flex;
  align-items: ${(props) =>
    props.verticalAlign === 'default' ? 'flex-start' : 'center'};
`;

export const MediaObject = styled.div`
  margin-right: ${(props) => renderSpacing(props.spacing)};
`;

export const MediaBody = styled.div`
  //flex: 1;
  min-width: 0;
  margin-right: ${(props) =>
    props.spacing ? renderSpacing(props.spacing) : 0};
`;
