import React from "react";
import UserRoleDash from "../components/AssignRole/UserRoleDash";
import renderer from 'react-test-renderer'
import { cleanup,render, act } from "@testing-library/react";
import '@testing-library/jest-dom';
import store from '../redux/store';
import App from '../App';
import { MemoryRouter} from 'react-router-dom';
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import configureMockStore from "redux-mock-store";
const middleware = [thunk];



  afterEach(() => {
    cleanup;
  });

  it('The page should render  the page and show all users', async () => {
    window.localStorage.setItem('auth-token', 'testing');
    await act(() =>
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/users']}>
          <App />
        </MemoryRouter>
      </Provider>
    )
  );

  })
  it('The page should render the page and show all roles', async () => {
    window.localStorage.setItem('auth-token', 'testing');
    await act(() =>
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/users/roles']}>
          <App />
        </MemoryRouter>
      </Provider>
    )
  );

  })
test("<UserRoleDash /> matches snapshot", ()=>{   
  const component = renderer
		.create(
			<Provider store={store}>
				<MemoryRouter>
          <UserRoleDash />
				</MemoryRouter>
			</Provider>,
		)
		.toJSON();
    expect(component).toMatchSnapshot();
})