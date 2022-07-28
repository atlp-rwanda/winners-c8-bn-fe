import React from 'react';
import { IconContext } from 'react-icons';
import { FcGoogle } from 'react-icons/fc';
import { FaFacebookF } from 'react-icons/fa';
function SocialAuth() {
	const handleFailure = (result) => {
		alert(result);
	};
	const handleLogin = (googleData) => {
		console.log(googleData);
	};
	return (
		<div
			style={{
				display: 'flex',
				flexDirection: 'row',
				alignItems: 'center',
				justifyContent: 'center',
			}}
		>
			<div style={{ paddingRight: '40px' }}>
				<FcGoogle style={{ fontSize: '40px', cursor: 'pointer' }} />
				<p>Google</p>
			</div>
			<div style={{ paddingLeft: '30px' }}>
				<FaFacebookF
					style={{
						fontSize: '40px',
						color: "1D3C78",
						cursor: 'pointer',
					}}
				/>
				<p>Facebook</p>
			</div>
		</div>
	);
}

export default SocialAuth;
