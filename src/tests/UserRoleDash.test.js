import React from "react";
import UserRoleDash from "../components/AssignRole/UserRoleDash";
import renderer from 'react-test-renderer'
import { cleanup,render,screen, act } from "@testing-library/react";
import '@testing-library/jest-dom';
import store from '../redux/store';
import App from '../App';
import { BrowserRouter as Router } from 'react-router-dom';
import { userResponse } from "./mocks/data";
import { MemoryRouter} from 'react-router-dom';
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import MockAxiosAdapter from 'axios-mock-adapter';
import axios from "axios";
const middleware = [thunk];
 const mock = new MockAxiosAdapter(axios)
 describe('User role Dashboard ', () => {
beforeEach(() =>{
  mock.onGet(/user/gi).reply(200, userResponse);
})

  afterEach(() => {
    cleanup();
    window.localStorage.clear();
    mock.reset();
  });
  test('should render assign role component', () => {
    render(
      <Provider store={store}>
        <Router>
          <UserRoleDash />
        </Router>
      </Provider>
    );
  const userRoleElement = screen.queryByTestId('assign-roles');
  expect(userRoleElement).not.toBeInTheDocument()
  expect(userRoleElement).not.toEqual('Assigning Role');
    })

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
 })