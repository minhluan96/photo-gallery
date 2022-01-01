import React from 'react';
import { Provider } from 'react-redux';
import { render } from '@testing-library/react';

export const renderWithStore = (initialState = {}, renderFunction = render) => {
  const store = mockStore(initialState);

  return (component, ...args) => {
    return renderFunction(
      <Provider store={store}>{component}</Provider>,
      ...args
    );
  };
};
