import PropTypes from 'prop-types';
import Button from './Button';

const Header = (props) => {
    return (
        <header className='header'>
            <h1>{props.title}</h1>
        </header>
    )
}

Header.defaultProps = {
    title: 'Welcome to Twitch Statistics!',
}

Header.propTypes = {
    title: PropTypes.string.isRequired,
}

export default Header
