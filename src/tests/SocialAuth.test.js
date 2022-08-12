import React from 'react'
import { Provider } from 'react-redux';
import  SocialAuth  from '../components/SocialOAuth';
import renderer from 'react-test-renderer'
import { MemoryRouter} from 'react-router-dom';
import store from '../redux/store'
// import {render} from '@testing-library/jest-dom'


test('<SocialAuth /> matches snapshot', () => {
    const component = renderer
		.create(
			<Provider store={store}>
				<MemoryRouter>
					<SocialAuth />
				</MemoryRouter>
			</Provider>,
		)
		.toJSON();
	expect(component).toMatchSnapshot();
});
