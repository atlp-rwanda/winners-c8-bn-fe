import React from "react";
import Sidebar from "../components/Sidebar/Sidebar";
import renderer from 'react-test-renderer'
import { logout } from "../redux/actions/logoutAction";
import { cleanup,render,screen, act, fireEvent } from "@testing-library/react";
import '@testing-library/jest-dom';
import store from '../redux/store';
import App from '../App';
import { BrowserRouter as Router } from 'react-router-dom';
import { MemoryRouter} from 'react-router-dom';
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import MockAxiosAdapter from 'axios-mock-adapter';
import axios from "axios";
const mock = new MockAxiosAdapter(axios)



describe('Sidebar Dashboard' , () =>{
    beforeEach(() =>{
     mock.onPut(/logout/gi).reply(200);
    })
    afterEach(() => {
        cleanup();
        window.localStorage.clear();
        mock.reset();
      }); 

      it('dispatches SUCCESS after logout', async () => {
        const userObj = {
          email: 'honore@gmail.com',
          password: 'Password@12345',
        };
    
        await store.dispatch(logout(userObj));
      });
      test('should render Sidebar Component', () => {
        render(
          <Provider store={store}>
            <Router>
              <Sidebar />
            </Router>
          </Provider>
        );
  const SidebarElement = screen.getByTestId('sidebar-test');
  expect(SidebarElement).toBeInTheDocument()
  expect(SidebarElement).toHaveTextContent('Dashboard');
      });

      it('The page should render  the page and logout', async () => {
        window.localStorage.setItem('auth-token', 'testing');
        await act(() =>
        render(
          <Provider store={store}>
            <MemoryRouter initialEntries={['/auth/logout']}>
              <App />
            </MemoryRouter>
          </Provider>
        )
      );
    
      })
      test("<Sidebar /> matches snapshot", ()=>{   
        const component = renderer
              .create(
                  <Provider store={store}>
                      <MemoryRouter>
                <Sidebar />
                      </MemoryRouter>
                  </Provider>,
              )
              .toJSON();
          expect(component).toMatchSnapshot();
      })
})
