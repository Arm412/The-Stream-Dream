import PropTypes from 'prop-types';

const Header = (props) => {
	return (
		<header className="header">
			<h1 className="text-color">{props.title}</h1>
		</header>
	);
};

Header.defaultProps = {
	title: 'Welcome!',
};

Header.propTypes = {
	title: PropTypes.string.isRequired,
};

export default Header;
