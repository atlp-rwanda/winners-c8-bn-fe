import React from 'react';
import { Provider } from 'react-redux';
import Accommodation from '../components/ListAccomodations/Accomodations';
import renderer from 'react-test-renderer';
import { MemoryRouter } from 'react-router-dom'; 
import store from "../redux/store";

test('<Accommodation /> matches snapshot', () => {
    const component = renderer
        .create(
            <Provider store={store}>
                <MemoryRouter>
                    <Accommodation />
                </MemoryRouter>
            </Provider>,
        )
        .toJSON();
    expect(component).toMatchSnapshot();
});


