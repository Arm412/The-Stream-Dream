import React from 'react';

const LoginBtn = () => {
	return (
		<a href="http://localhost:3001/twitch/login">
			<div className="login-twitch-btn primary-bg header-color">
				<span>Log In with Twitch</span>
			</div>
		</a>
	);
};

export default LoginBtn;
