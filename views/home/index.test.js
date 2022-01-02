import React from 'react';
import HomeView from 'views/home';
import { fireEvent, waitFor, within } from '@testing-library/dom';

const renderComponent = () => renderWithStore({})(<HomeView />);

describe('Home Page', () => {
  it('should show Homepage on page title', () => {
    const expectPageTitle = 'Homepage';

    renderComponent();
    expect(document.title).toEqual(expectPageTitle);
  });

  it('should has list of photos', () => {
    const { getByRole } = renderComponent();

    const list = getByRole('list', {
      name: /photos/i,
    });

    const { getAllByRole } = within(list);
    const items = getAllByRole('listitem');
    expect(items).toBeInTheDocument();
  });

  it('should scroll if there was more items in the list', async () => {
    const { getByRole } = renderComponent();

    const list = getByRole('list', {
      name: /photos/i,
    });

    const { getAllByRole } = within(list);
    const currentItems = getAllByRole('listitem');

    const currentItemLength = currentItems?.length || 0;

    fireEvent.scroll(list, { target: { scrollY: 100 } });

    await waitFor(() => {
      const { getAllByRole } = within(list);
      const afterScrolledItems = getAllByRole('listitem');

      const afterScrolledItemLength = afterScrolledItems?.length || 0;

      expect(currentItemLength).toBeLessThanOrEqual(afterScrolledItemLength);
    });
  });
});
