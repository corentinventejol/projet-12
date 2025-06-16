import './header.css';
import logo from '../../assets/logo.png';
import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <header className='header'>
            <div className='logo'>
                <img src={logo} alt="Logo" />
            </div>
            <ul className='nav'>
                <li>
                    <Link to="/">Accueil</Link>
                </li>
                <li>
                    <Link to="/">Profil</Link>
                </li>
                <li>
                    <Link to="/">Réglage</Link>
                </li>
                <li>
                    <Link to="/">Communauté</Link>
                </li>
            </ul>
        </header>
    )
}

export default Header;