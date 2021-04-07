import React from 'react';

const LoginBtn = () => {
	return (
		<a href="/twitch/login">
			<div className="login-twitch-btn primary-bg text-color">
				<span>Log In with Twitch</span>
			</div>
		</a>
	);
};

export default LoginBtn;
