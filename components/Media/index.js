import React from 'react';
import { MediaBody, MediaContainer, MediaObject } from './styles';

export default function Media({
  image,
  children,
  extra,
  spacing = 'sm',
  className,
  style,
  verticalAlign = 'default',
}) {
  return (
    <MediaContainer
      className={className}
      style={style}
      verticalAlign={verticalAlign}
    >
      <MediaObject spacing={spacing}>{image}</MediaObject>
      <MediaBody spacing={extra ? spacing : null}>{children}</MediaBody>
      {extra != null && <MediaObject>{extra}</MediaObject>}
    </MediaContainer>
  );
}
