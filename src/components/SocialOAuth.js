import React from 'react';
import authActions from '../redux/actions/authActions';
import { connect } from 'react-redux';
import { FcGoogle } from 'react-icons/fc';
import { ImFacebook } from 'react-icons/im';

class SocialAuth extends React.Component {
	constructor(props) {
		super(props);
	}
	isLoggedIn = false;
	componentDidMount() {
		const params = new URLSearchParams(window.location.search);
		/* istanbul ignore next */
		if (params.has('token')) {
			const token = params.get('token');
			this.isLoggedIn = true;
			window.localStorage.setItem('auth-token', token);
			this.props.LOGIN(token);
			window.location.replace('/dashboard');
		}
	}
	render() {
		return (
			<div
				style={{
					display: 'flex',
					flexDirection: 'row',
					alignItems: 'center',
					justifyContent: 'center',
					marginTop: '50px',
				}}
			>
				<div style={{ paddingRight: '40px' }}>
					<a href='https://winners-c8-bn-be-staging.herokuapp.com/api/oauth/google'>
						<FcGoogle
							style={{ fontSize: '40px', cursor: 'pointer' }}
						/>
					</a>
				</div>
				<div style={{ paddingLeft: '30px' }}>
					<a href='https://winners-c8-bn-be-staging.herokuapp.com/api/oauth/facebook'>
						<ImFacebook
							style={{
								fontSize: '40px',
								color: '1D3C78',
								cursor: 'pointer',
							}}
						/>
					</a>
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state) => ({
	token: state.auth.token,
});
const { login: LOGIN } = authActions;
export default connect(mapStateToProps, { LOGIN })(SocialAuth);
// export default LoginForm;
