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
const mockStore = configureMockStore(middleware);

const roleInitialState = {
    UserRoleDash: {
      requestSent: false,
      responseData: {
        isSuccess: undefined,
        message: undefined,
      },
    },
  };



  afterEach(() => {
    cleanup;
  });


 
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