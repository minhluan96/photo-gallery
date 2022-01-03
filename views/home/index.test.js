import React from 'react';
import HomeView from 'views/home';
import { fireEvent, waitFor, within } from '@testing-library/dom';
import { MOCK_DATA } from './index.data';

const renderComponent = () =>
  renderWithStore({
    gallery: {
      photos: MOCK_DATA,
    },
  })(<HomeView />);

describe('Home Page', () => {
  beforeEach(() => {
    const mockIntersectionObserver = jest.fn();
    mockIntersectionObserver.mockReturnValue({
      observe: () => null,
      unobserve: () => null,
      disconnect: () => null,
    });
    window.IntersectionObserver = mockIntersectionObserver;
  });

  it('should show Photo Gallery on page title', () => {
    const expectPageTitle = 'Photo Gallery';

    renderComponent();
    expect(document.title).toEqual(expectPageTitle);
  });

  it('should has list of photos', async () => {
    const { getByRole } = renderComponent();

    const list = getByRole('list');

    const { getAllByRole } = within(list);
    const items = getAllByRole('listitem');
    await waitFor(() => {
      expect(items).toBeTruthy();
    });
  });

  it('should scroll if there was more items in the list', async () => {
    const { getByRole } = renderComponent();

    const list = getByRole('list');

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

  it('should show the actions when hover on the photo', async () => {
    const { getByRole } = renderComponent();

    const list = getByRole('list');
    const { getAllByRole } = within(list);

    const photos = getAllByRole('listitem');

    const firstItem = photos[0];

    fireEvent.mouseEnter(firstItem);

    await waitFor(() => {
      const { getAllByRole } = within(firstItem);
      const hoverActions = getAllByRole('button');

      expect(hoverActions.length).toEqual(2);
    });
  });

  it('should show a info modal when click into view action', async () => {
    const { getByRole, queryByText } = renderComponent();

    const list = getByRole('list');
    const { getAllByRole } = within(list);

    const photos = getAllByRole('listitem');

    const firstItem = photos[0];

    fireEvent.mouseEnter(firstItem);

    await waitFor(() => {
      const { getAllByRole } = within(firstItem);
      const hoverActions = getAllByRole('button');

      const viewButton = hoverActions[0];
      fireEvent.click(viewButton);

      const descriptionText = queryByText(/description/i);
      expect(descriptionText).toBeInTheDocument();
    });
  });

  it('should show a edit modal when click into edit action', async () => {
    const { getByRole, queryByText } = renderComponent();

    const list = getByRole('list');
    const { getAllByRole } = within(list);

    const photos = getAllByRole('listitem');

    const firstItem = photos[0];

    fireEvent.mouseEnter(firstItem);

    await waitFor(() => {
      const { getAllByRole } = within(firstItem);
      const hoverActions = getAllByRole('button');

      const editButton = hoverActions[1];
      fireEvent.click(editButton);

      const descriptionText = queryByText(/description/i);
      const nameText = queryByText(/name/i);
      const titleText = queryByText(/edit photo/i);

      expect(descriptionText).toBeInTheDocument();
      expect(nameText).toBeInTheDocument();
      expect(titleText).toBeInTheDocument();
    });
  });
});
