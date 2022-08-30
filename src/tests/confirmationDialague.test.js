import React from 'react';
import { Provider } from 'react-redux';
import ConfirmationDialog from '../components/Reject-approve/ConfirmationDialog';
import renderer from 'react-test-renderer';
import { MemoryRouter } from 'react-router-dom';
import store from '../redux/store';
// import {render} from '@testing-library/jest-dom'
describe.only('Dialogue',() =>{it(' <ConfirmationDialog /> matches snapshot', () => {
  const component = renderer
    .create(
      <Provider store={store}>
        <MemoryRouter>
          <ConfirmationDialog />
        </MemoryRouter>
      </Provider>
    )
    .toJSON();
  expect(component).toMatchSnapshot();
});
} )
