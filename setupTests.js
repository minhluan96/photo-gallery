import '@testing-library/jest-dom';
import '@testing-library/jest-dom/extend-expect';
import mockStore from './config/test/mockStore';
import { renderWithStore } from './config/test/render';

global.mockStore = mockStore;
global.renderWithStore = renderWithStore;
